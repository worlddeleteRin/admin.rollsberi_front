<template> 
<div 
@click="itemClick"
class="flex items-center justify-start px-3 py-2 mx-auto rounded-lg cursor-pointer group group-hover hover:bg-def_btn_dim">
	<Icon
		:icon="icon"
		width="20"
		class="text-white group-hover:text-black"
	/>
	<div class="text-white ml-2 tracking-wide group-hover:text-black select-none">
		{{ title }}
	</div>
</div>
</template>
	
<script>
import { defineComponent } from 'vue';
import { Icon } from '@iconify/vue';

export default defineComponent({
	name: "SidebarMenuItem",
	components: {
		Icon,
	},
	emits: ["item-click"],
	props: {
		icon: {
			type: String,
			default: "",
		},
		title: {
			type: String,
			default: "",
		}
	},
	setup (props, {emit}) {
		// functions
		const itemClick = () => emit("item-click")
		return {
			itemClick,
		}
	}
});
</script>
