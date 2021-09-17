<template>
<div 
	v-if="orders_loaded"
>
	<page-title
		title="Заказы"
	/>

	<el-table
		:data="orders"
	>
		<el-table-column label="Клиент">
			<template #default="scope">
				<div 
				class="flex items-center tracking-wide text-black text-md"
					v-if="scope.row.customer_id"
				>
					<div class="p-2 mr-2 bg-green-400 rounded-full">
						<Icon icon="bx:bxs-user" class="text-white"/>
					</div>
					{{ scope.row.customer_username }}
				</div>
				<div
					class="flex items-center tracking-wide text-black text-md"
					v-else
				>
					<div class="p-2 mr-2 bg-blue-400 rounded-full">
						<Icon icon="bx:bxs-user" class="text-white"/>
					</div>
					{{ scope.row.guest_phone_number }}
				</div>
			</template>
		</el-table-column>
		<el-table-column label="Дата">
			<template #default="scope">
				{{ scope.row.date_created }}
			</template>
		</el-table-column>
		<el-table-column label="Статус">
			<template #default="scope">
				<div
					class="px-3 py-1 text-white rounded-lg max-w-max"
					:style="'background-color: ' + scope.row.status.color"
				>
					{{ scope.row.status.name_display }}
				</div>
			</template>
		</el-table-column>
		<el-table-column label="Сумма">
			<template #default="scope">
				<div class="text-xl tracking-wider text-black">
				{{ scope.row.total_amount }} &#8381; 
				</div>
			</template>
		</el-table-column>
		<el-table-column label="Действия">
			<template #default="scope">
				<div class="">
					<el-button
						type="primary"
						size="small"
						@click="goOrderPage(scope.row)"
					>
						<Icon icon="akar-icons:edit" width="20" />
					</el-button>
					<el-popconfirm
						title="Sure, you want to delete this order?"
						@confirm="deleteOrder(scope.row)"
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
		</el-table-column>

	</el-table>

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
			// functions
			goOrderPage,
			goCreateOrderPage,
			deleteOrder,
		}
	}
});
</script>
