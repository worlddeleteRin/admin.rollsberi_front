<template>
<div 
	v-if="orders_loaded"
>
	<page-title
		title="Заказы"
	/>

	<a-table
		:data-source="orders"
	>
		<a-table-column label="Клиент" key="customer_username" data-index="customer_id">
			<template>
				<div 
				class="flex items-center tracking-wide text-black text-md"
					v-if="customer_id"
				>
					<div class="p-2 mr-2 bg-green-400 rounded-full">
						<Icon icon="bx:bxs-user" class="text-white"/>
					</div>
                        customer_username here
				</div>
				<div
					class="flex items-center tracking-wide text-black text-md"
					v-else
				>
					<div class="p-2 mr-2 bg-blue-400 rounded-full">
						<Icon icon="bx:bxs-user" class="text-white"/>
					</div>
                        guest_phone_number here
				</div>
			</template>
		</a-table-column>

		<a-table-column title="Дата" key="date_created" data-index="date_created"/>

		<a-table-column title="Статус" key="status">
			<template #bodyCell="{ record }">
				<div
					class="px-3 py-1 text-white rounded-lg max-w-max"
					:style="'background-color: ' + record?.status.color"
				>
                    статус тут
                    {{ record }}
					{{ record?.status.name_display }}
				</div>
			</template>
		</a-table-column>

		<a-table-column title="Сумма" key="cart?.total_amount" data-index="cart?.total_amount">
			<template>
				<div class="text-xl tracking-wider text-black">
				{{ total_amount }} &#8381; 
				</div>
			</template>
		</a-table-column>

		<a-table-column title="Действия">
			<template #bodyCell="record">
				<div class="">
					<el-button
						type="primary"
						size="small"
						@click="goOrderPage(record)"
					>
						<Icon icon="akar-icons:edit" width="20" />
					</el-button>
					<el-popconfirm
						title="Вы уверены, что хотите удалить заказ?"
						confirmButtonText="Да"
						cancelButtonText="Нет"
						@confirm="deleteOrder(record)"
					>
						<template #reference>
							<el-button
								type="danger"
								size="small"
							>
								<Icon icon="ant-design:delete-filled" width="20" />
							</el-button>
						</template>
					</el-popconfirm>
				</div>
			</template>
		</a-table-column>

	</a-table>

	<!-- orders pagination -->
	<div class="mt-3"
		v-if="orders_info.pages_count > 0"
	>
		<el-pagination
			background 
			layout="prev, pager, next"
			v-model:current-page="orders_current_page"
			:page-count="orders_info.pages_count"
		>
		</el-pagination>
	</div>
	<!-- eof orders pagination -->

	<!-- new order button -->
	<el-button
		@click="goCreateOrderPage"
		:circle="true"
		type="primary"
		size="small"
		class="fixed bottom-10 right-10"
	>
		<Icon
			icon="akar-icons:plus"
			width="30"
		/>
	</el-button>
	<!-- eof new order button -->

</div>

<!-- if orders not loaded block -->
<div v-else>
	Загрузка заказов...
</div>
<!-- eof order not loaded block -->
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
	name: "OrdersPage",
	setup () {
		const orders_loaded = ref(false)
		const store = useStore()
		const router = useRouter()
		// computed
		const orders = computed(() => store.state.orders.orders);
		const orders_info = computed(() => store.state.orders.orders_info);
		const orders_current_page = computed({
			get () {
				return orders_info.value.current_page
			},
			async set(new_value: string) {
				await store.dispatch("orders/getOrdersAPI", {"page": new_value})
				console.log('new pagination value is set', new_value)
			}
		});
		// functions
		onBeforeMount( async () => {
			if (orders.value) {
				orders_loaded.value = true
				return
			}
			// no orders, need load them
			await store.dispatch('orders/getOrdersAPI')
			orders_loaded.value = true
			return 
		});
		const goOrderPage = (order: Record<string,any>) => {
			console.log('order is', order)
			router.push('/orders/' + order.id)
		}
		const goCreateOrderPage = () => {
			router.push('/orders/new-order')
		}
		const deleteOrder = async (order: Record<string,any>) => {
			const is_deleted = await store.dispatch('orders/deleteOrderAPI', order.id)
			// success message, if deleted, error if not
		}

		return {
			// ref
			orders_loaded,
			// computed
			orders,
			orders_current_page,
			orders_info,
			// functions
			goOrderPage,
			goCreateOrderPage,
			deleteOrder,
		}
	}
});
</script>
