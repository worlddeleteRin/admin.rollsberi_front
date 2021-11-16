<template>
<div>

<page-title
	title="Детали заказа"
/>

<div 
	v-if="order_loaded"
>
	<!-- order id -->
	<div class="font-semibold">
		id - {{ order.id }}
	</div>
	<!-- eof order id -->
	<!-- order date_created -->
	<div class="px-3 py-1 bg-red-100 rounded-md max-w-max">
		Дата создания: 
		<span class="font-semibold">
			{{ order.date_created }}
		</span>
	</div>
	<!-- eof order date_created -->
	<!-- order status select -->
	<div>
		<stage-title title="Статус заказа:" 
		/>
		<a-select
			v-model:value="update_order.status_id"
		>
			<a-select-option
				v-for="status in Object.keys(order_statusses)"
				:key="order_statusses[status].id"
				:value="order_statusses[status].id"
				:style="{'color': order_statusses[status].color}"
			>
                {{ order_statusses[status].name }}
			</a-select-option>
		</a-select>
	</div>
	<!-- order status select -->

	<!-- order delivery method -->
	<div>
		<stage-title title="Способ доставки" 
		/>
		<div class="text-lg font-semibold"> {{ order.delivery_method.name }} </div>
	</div>
	<!-- eof order delivery method -->
	<!-- order payment method -->
	<div>
		<stage-title title="Способ оплаты" 
		/>
		<div class="text-lg font-semibold"> {{ order.payment_method.name }} </div>
	</div>
	<!-- eof order payment method -->

	<!-- delivery address -->
	<div>
		<stage-title title="Адрес доставки" 
		/>
		<div>
			{{order.customer_id ? order.delivery_address.address_display : order.guest_delivery_address}}
		</div>
	</div>
	<!-- eof delivery address -->


	<stage-title title="Клиент" 
	/>
	<!-- order authorized user -->
	<div v-if="order.customer_id"
		class="flex items-center flex-1 px-4 py-2 bg-gray-100 rounded-lg cursor-pointer max-w-max"
	>
		<div class="p-2 mx-2 bg-green-400 rounded-full max-w-max">
			<Icon icon="bx:bxs-user" class="text-white" />
		</div>
		<div class="mr-4">
			{{ order.customer_username }}
		</div>
	</div>
	<!-- eof order authorized user -->
	<!-- order authorized user -->
	<div v-if="!order.customer_id"
		class="flex items-center flex-1 px-4 py-2 bg-gray-100 rounded-lg max-w-max"
	>
		<div class="p-2 mx-2 bg-blue-400 rounded-full max-w-max">
			<Icon icon="bx:bxs-user" class="text-white" />
		</div>
		<div class="mr-4">
			{{ order.guest_phone_number }}
		</div>
	</div>
	<!-- eof order authorized user -->
	
	<!-- order content -->
	<div>

		<stage-title title="Состав заказа:" 
		/>

		<a-table
			:data-source="order?.cart?.line_items"
		>
			<a-table-column title="Изображение" key="product.imgsrc[0]">
				<template #default="{ record }">
					<img :src="record.product.imgsrc[0]"
						class="w-20"
					/>
				</template>
			</a-table-column>
			<a-table-column
                key="product.id"
				data-index="product"
				title="Название"
			>
                <template #default="{ record }">
                    {{ record.product.name }}
                </template>
            </a-table-column>
			<a-table-column
				data-index="quantity"
				title="Кол-во"
                key="quantity"
			/>
		</a-table>
	</div>
	<!-- eof order content -->

	<!-- order summary -->
	<div>
		<div class="flex items-center">
			<stage-title title="Сумма заказа без скидки" />
			<div class="mt-2 ml-3 text-lg">
				{{ order.cart.base_amount }} &#8381;
			</div>
		</div>
		<div class="flex items-center">
			<stage-title title="Сумма скидки" />
			<div class="mt-2 ml-3 text-lg">
				{{ order.cart.discount_amount }} &#8381;
			</div>
		</div>
		<div class="flex items-center"
            v-if="order.cart.bonuses_used"
        >
			<stage-title title="Оплачено бонусами" />
			<div class="mt-2 ml-3 text-lg">
				{{ order.cart.pay_with_bonuses }} &#8381;
			</div>
		</div>
		<div class="flex items-center">
			<stage-title title="Общая сумма заказа" />
			<div class="mt-2 ml-3 text-lg">
				{{ order.cart.total_amount }} &#8381;
			</div>
		</div>
	</div>
	<!-- eof order summary -->

	<!-- save order -->
	<div class="mt-4">
		<a-button
			@click="updateOrder"
			type="primary"	
		>
			Сохранить	
		</a-button>
		<a-button
			@click="goOrdersPage"
		>
			Назад	
		</a-button>
	</div>
	<!-- eof save order -->
</div>
<!-- eof product info -->

<!-- if orders not loaded block -->
<div v-else>
	Загрузка заказа...
</div>
<!-- eof order not loaded block -->

</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onMounted, computed, ref, reactive } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
	name: "OrderPage",
	setup (props, {emit}) {
		const order_loaded = ref(false)
		const store = useStore()
		const route = useRoute()
		const router = useRouter()
		// reactive
		const update_order = reactive({
			status_id: '',
		})
		// refs
		//const order_status = ref('')
		// computed
		const order = computed(() => store.state.orders.current_order);
		const order_statusses = computed(() => store.state.site.order_statusses);
		// functions
		onBeforeMount( async () => {
			const order_id = route.params.order_id
			await store.dispatch('orders/getOrderAPI', order_id)
			if (!order_statusses.value) {
				await store.dispatch('site/getOrderStatussesAPI')
			}
			update_order.status_id = order.value.status.id
			order_loaded.value = true
			return
		});
		const updateOrder = async () => {
			const order_updated: boolean = await store.dispatch("orders/updateOrderAPI", 
			{update_order: update_order, order_id: order.value.id})
			if (order_updated) {
				return router.push("/orders")
			}
		}
		const goOrdersPage = () => router.push("/orders")

		return {
			// reactive
			update_order,
			// ref
			order_loaded,
			// computed
			order,
			order_statusses,
			// functions
			updateOrder,
			goOrdersPage,
		}
	}
});
</script>
