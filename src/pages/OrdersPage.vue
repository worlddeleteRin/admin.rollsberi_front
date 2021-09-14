<template>
<div 
	v-if="orders_loaded"
>

	<el-table
		:data="orders"
		@row-click="goOrderPage"
	>
		<el-table-column label="Клиент">
			<template #default="scope">
				<div class="tracking-wide text-black text-md">
					{{ scope.row.customer_username }}
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
			router.push('/orders/' + order.id)
		}
		const goCreateOrderPage = () => {
			router.push('/orders/new-order')
		}

		return {
			// ref
			orders_loaded,
			// computed
			orders,
			// functions
			goOrderPage,
			goCreateOrderPage,
		}
	}
});
</script>
