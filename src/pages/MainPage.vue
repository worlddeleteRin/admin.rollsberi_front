<template>
<div>
	main page is here
	common info is {{ common_info }}
</div>
</template>

<script>
import { defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
	name: "MainPage",
	setup () {
		const store = useStore()
		// computed
		const common_info = store.state.site.common_info

		return {
			common_info,
		}
	}
});
</script>
