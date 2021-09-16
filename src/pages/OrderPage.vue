<template>
<div>

<page-title
	title="Изменение заказа"
/>

<div 
	v-if="order_loaded"
>
	asdfasdf
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
import { defineComponent, onBeforeMount, computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

export default defineComponent({
	name: "OrderPage",
	setup (props, {emit}) {
		const order_loaded = ref(false)
		const store = useStore()
		const route = useRoute()
		// computed
		const order = computed(() => store.state.orders.current_order);
		// functions
		onBeforeMount( async () => {
			const order_id = route.params.order_id
			await store.dispatch('orders/getOrderAPI', order_id)
			order_loaded.value = true
			return
		});

		return {
			// ref
			order_loaded,
			// computed
			order,
			// functions
		}
	}
});
</script>
