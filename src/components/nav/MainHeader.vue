<template>
<div class="flex items-center w-full px-4 bg-white rounded-lg shadow-xl">

	<!-- sidebar content -->
	<div class="px-2 py-4">
	    Панель управления	
	</div>
	<!-- eof sidebar content -->
	<!-- user block -->
	<div class="flex justify-end flex-1">
		<a-dropdown class="flex items-center flex-1 px-2 py-2 max-w-max">
			<div class="flex items-center flex-1 w-full px-2 py-2 rounded-lg cursor-pointer bg-def_btn_dim">
				<div>
				<Icon
					icon="bx:bx-user"
					width="28"
					class="text-def_btn_text"
				/>
				</div>
				<div class="ml-1 text-def_btn_text">
					{{ adminUser?.name }}
				</div>
			</div>
			<template #overlay>
				<a-menu>
					<a-menu-item
						@click="logoutAdminClick"
					>
							Выйти
					</a-menu-item>
				</a-menu>
			</template>
		</a-dropdown>
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
	props: {
		adminUser: {
			type: Object,
			default: null,
		}
	},
	emits: ['logout'],
	setup (props, {emit}) {
		// functions	
		const logoutAdminClick = () => emit('logout')
		return {
			// functions
			logoutAdminClick,
		}
	}
});

</script>

