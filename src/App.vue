<template>
	<div class="flex">

	<NavSidebar
	/>

	<div class="flex flex-col w-full h-full">

	<MainHeader
	/>

	main app is here

	<router-view>
	</router-view>

	</div>

	</div>
</template>

<script>
import { defineComponent } from 'vue';
import NavSidebar from '@/components/nav/NavSidebar.vue';
import MainHeader from '@/components/nav/MainHeader.vue';

export default defineComponent({
	name: "App",
	components: {
		NavSidebar,
		MainHeader,
	}
});
</script>
