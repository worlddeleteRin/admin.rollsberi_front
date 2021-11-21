<template>
<div v-if="item">
<div class="flex items-center w-11/12 px-3 py-3 mt-3 rounded-lg bg-gray-50">
	<img :src="item.product.imgsrc[0]" class="object-contain w-20"/>
	<div>
		<div>{{ item.product.name }}</div>
		<div>
			Цена: <strong>{{ item.product.price }},</strong>
			Цена по скидке: <strong>{{ item.product.sale_price ? item.product.sale_price : '--' }}</strong>
		</div>
		<div>{{ item.product.description }}</div>
	</div>
	<div class="flex justify-end flex-1">
	<div class="flex items-center">
		<a-button
			type="primary"
            size="small"
			shape="round"
			@click="deleteItemQuantity"
			class=""
		>
			<Icon
				icon="akar-icons:minus"
			/>
		</a-button>
		<div class="mx-3">{{ item.quantity }}</div>
		<a-button
			type="primary"
			size="small"
			shape="round"
			@click="addItemQuantity"
			class=""
		>
			<Icon
				icon="akar-icons:plus"
			/>
		</a-button>
	</div>
	<div class="ml-4">
		<a-button
			type="primary"
            shape="round"
			size="medium"
			@click="removeItem"
		danger>
			Убрать
		</a-button>
	</div>
	</div>
</div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: "CartLineItem",
	props: {
		item: {
			type: Object,
			default: null,
		}
	},
	emits: ['delete-quantity', 'add-quantity', 'remove-item'],
	setup (props, {emit}) {
		// functions
		const deleteItemQuantity = () => emit('delete-quantity', props.item)
		const addItemQuantity = () => emit('add-quantity', props.item)
		const removeItem = () => emit('remove-item', props.item)
		return {
			// functions
			deleteItemQuantity,
			addItemQuantity,
			removeItem,
		}
	}
});

</script>
