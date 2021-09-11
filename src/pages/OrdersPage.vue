<template>
<div>
	orders page is here
</div>
</template>

<script>
import { defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
	name: "OrdersPage",
	setup () {
		const store = useStore()
		// computed
		return {
		}
	}
});
</script>
