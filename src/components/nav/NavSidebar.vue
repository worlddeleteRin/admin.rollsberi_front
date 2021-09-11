<template>
<div class="bg-white text-black max-w-[200px] w-full flex flex-col flex-shrink-0 h-screen shadow-xl">

	<!-- sidebar content -->
	<div class="px-2 py-4">

		<router-link
			:to="'/'"
			class="text-xl font-semibold tracking-wider"
		>
			Rollsberi
		</router-link>
	
		<div class="mt-3">
			<sidebar-menu-item
				@item-click="goTo(menu_item.link_to)"
				v-for="menu_item in navbar_menu_items"
				:key="menu_item"
				:icon="menu_item.icon"
				:title="menu_item.title"
			/>
		</div>

	</div>
	<!-- eof sidebar content -->

</div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

import SidebarMenuItem from '@/components/nav/SidebarMenuItem.vue';

export default defineComponent({
	name: "NavSidebar",
	components: {
		SidebarMenuItem,
	},
	setup () {
		const router = useRouter()

		const navbar_menu_items = [
			{icon: "feather:package", title: "Заказы", link_to: "/orders"},
			{icon: "feather:package", title: "Заказы", link_to: "/orders"},
		]
		// functions
		const goTo = (link_to: string) => {
			console.log("call go to")
			router.push(link_to)
		}
		return {
			navbar_menu_items,
			// functions
			goTo,
		}
	}
});

</script>

