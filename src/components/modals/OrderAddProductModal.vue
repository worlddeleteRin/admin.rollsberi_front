<template>
<div class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30"
	@click="closeModal"	
>
</div>

<div class="fixed top-1/2 left-1/2 w-11/12 h-full max-w-[700px] max-h-[500px] bg-white -translate-x-1/2 -translate-y-1/2 rounded-md px-4 py-4">
<div class="relative w-full h-full overflow-hidden">
	<div>
		<page-title
			title="Добавление товара в заказ"
			class="mb-3"
		/>
		<a-input
			:value="product_search_name"
			@change="inputProductName"
			placeholder="Начните вводить имя товара"
		>
		</a-input>
	</div>


	<div 
	v-if="!found_products"
	class="flex items-center justify-center mt-5 text-2xl tracking-wide text-gray-400">
		Результаты поиска
	</div>

	<div 
	v-if="found_products && found_products.length == 0"
	class="flex items-center justify-center mt-5 text-2xl tracking-wide text-gray-400">
		Товары не найдены	
	</div>

	<div
		v-if="found_products && found_products.length > 0"
		class="max-h-full mt-4 overflow-y-scroll h-11/12"
	>
		<div
			v-for="product in found_products"
			:key="product.id"
			class="px-4 py-2 mx-4 mx-auto my-2 rounded-md bg-green-50"
		>
			<div class="flex justify-between items-center">
                <div class="flex items-center">
                    <img :src="product.imgsrc[0]" class="object-contain w-20" />
                    <div class="flex flex-col ml-3">
                        <div>{{ product.name }}</div>
                        <div>{{ product.description }}</div>
                    </div>
                </div>
                <div>
                    <a-button 
                        @click="addItemClick(product)"
                        type="primary" 
                        shape="round"
                        ghost
                        >
                            Выбрать
                    </a-button>
                </div>
			</div>
		</div>
	</div>

</div>
</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';

import { message } from 'ant-design-vue';

export default defineComponent({
	name: "OrderAddProductModal",
	emits: ['close-modal'],
	setup (props, {emit}) {
		const store = useStore()
		// refs
		const product_search_name = ref('')
		const found_products = ref(null)
		// functions
		const closeModal = () => emit('close-modal')
		const inputProductName = async (e: any) => {
			found_products.value = null
			product_search_name.value = e.target.value
			if (product_search_name.value.length > 3) {
				await findProducts(product_search_name.value)
			}
		}
		const findProducts = async (search_string: string) => {
			found_products.value = await store.dispatch("products/findProductsAPI", search_string)
		}
		const addItemClick = async (product: Record<string,any>) => {
			store.dispatch('cart/addLineItemAPI', {product: product})
            message.success('Товар добавлен в корзину')
		}
		return {
			// refs
			product_search_name,
			found_products,
			// functions
			closeModal,
			inputProductName,
			addItemClick,
		}
	}
});
</script>
