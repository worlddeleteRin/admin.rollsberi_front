<template>
<div>

<page-title
	title="Детали заказа"
/>

<div 
	v-if="order_loaded"
>
	{{ order_statusses }}
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
		<el-select
			v-model="order_status"
		>
			<el-option	
				v-for="status in Object.keys(order_statusses)"
				:key="order_statusses[status].id"
				:label="order_statusses[status].name"
				:value="order_statusses[status].id"
			>
			</el-option>
		</el-select>
	</div>
	<!-- order status select -->
	{{ order }}
</div>

<!-- if orders not loaded block -->
<div v-else>
	Загрузка заказа...
</div>
<!-- eof order not loaded block -->

</div>

</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onMounted, computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

export default defineComponent({
	name: "OrderPage",
	setup (props, {emit}) {
		const order_loaded = ref(false)
		const store = useStore()
		const route = useRoute()
		// refs
		const order_status = ref('')
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
			order_status.value = order.value.status.id
			order_loaded.value = true
			return
		});

		return {
			// ref
			order_loaded,
			order_status,
			// computed
			order,
			order_statusses,
			// functions
		}
	}
});
</script>
