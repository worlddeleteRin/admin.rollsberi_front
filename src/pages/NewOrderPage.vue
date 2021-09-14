<template>
<div>
new order page is here

<div 
	v-if="true"
>
	asdfasdf
</div>

<!-- if orders not loaded block -->
<div v-else>
	Загрузка ...
</div>
<!-- eof order not loaded block -->

</div>

</template>

<script lang="ts">
import { defineComponent, onBeforeMount, computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

export default defineComponent({
	name: "NewOrderPage",
	setup (props, {emit}) {
		const store = useStore()
		const route = useRoute()
		// computed
		// functions
		onBeforeMount( async () => {
			return
		});

		return {
			// ref
			// computed
			// functions
		}
	}
});
</script>
