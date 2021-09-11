<template>
<div
	v-if="initial_loaded"
>

	<div class="flex"
		v-if="is_authorized"
	>

	<NavSidebar
	/>

	<div class="flex flex-col w-full h-full">

	<MainHeader
		:adminUser="admin_user"
	/>

	main app is here

	<router-view>
	</router-view>

	</div>

	</div>

	<!-- user is not authorized, show login form -->
	<div v-else>
		<LoginForm
			@login="loginAdmin"
		/>
	</div>
	<!-- eof login form -->
</div>

<div v-else>
	Загрузка...
</div>

</template>

<script lang="ts">
import { defineComponent, onBeforeMount, computed, ref } from 'vue';
import { useStore } from 'vuex';


import LoginForm from '@/components/login/LoginForm.vue';
import NavSidebar from '@/components/nav/NavSidebar.vue';
import MainHeader from '@/components/nav/MainHeader.vue';

export default defineComponent({
	name: "App",
	components: {
		LoginForm,
		NavSidebar,
		MainHeader,
	},
	setup () {
		const store = useStore()
		// ref
		const initial_loaded = ref(false)
		// computed
		const admin_user = computed(() => store.state.authorization.admin_user);
		const is_authorized = computed(() => store.state.authorization.is_authorized);
		// functions
		onBeforeMount(async () => {
			// try to auth user
			await store.dispatch("authorization/checkUserAuth")
			initial_loaded.value = true
		});

		const loginAdmin = async (login_info: Record<string,any>) => {
			const is_success = await store.dispatch("authorization/loginAdminAPI", login_info)
			if (is_success) {
				await store.dispatch("authorization/checkUserAuth")
			}
		}

		return {
			// ref
			initial_loaded,
			// computed
			admin_user,
			is_authorized,
			// functions
			loginAdmin,
		}
	}
});
</script>
