<template>
<div 
	v-if="orders_loaded"
>

	<el-table
	>
		<el-table-column label="Дата">
			<template #default="">
				asdfadsf
			</template>
		</el-table-column>
	</el-table>
	{{ orders }}

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

export default defineComponent({
	name: "OrdersPage",
	setup () {
		const orders_loaded: boolean = ref(false)
		const store = useStore()
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
		return {
			// ref
			orders_loaded,
			// computed
			orders,
		}
	}
});
</script>
