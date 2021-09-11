<template>
<div class="flex items-center w-full px-4 bg-white rounded-lg shadow-xl">

	<!-- sidebar content -->
	<div class="px-2 py-4">
		some header is here
	</div>
	<!-- eof sidebar content -->
	<!-- user block -->
	<div class="flex justify-end flex-1">
		<div class="flex items-center px-5 py-2 rounded-lg cursor-pointer bg-def_btn_dim max-w-max">
			<Icon
				icon="bx:bx-user"
				width="28"
				class="text-def_btn_text"
			/>
			<div class="ml-1 text-def_btn_text">
				user name	
			</div>
		</div>
	</div>
	<!-- eof user block -->

</div>

</template>

<script>
import { defineComponent } from 'vue';
import { Icon } from "@iconify/vue"

export default defineComponent({
	name: "MainHeader",
	components: {
		Icon,
	},
	setup () {
		
		return {

		}
	}
});

</script>

