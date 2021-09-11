<template>

    <div class="fixed w-full max-w-sm p-6 m-auto bg-white shadow-md rounded-md dark:bg-gray-800 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 class="text-3xl font-semibold text-center text-gray-700 dark:text-white">
			Rollsberi Admin
		</h1>

        <div class="mt-6">
            <div>
                <label for="username" class="block text-sm text-gray-800 dark:text-gray-200">
					Логин
				</label>
                <input type="text"
					v-model="login_info.username"
                    class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
            </div>

            <div class="mt-4">
                <div class="flex items-center justify-between">
                    <label for="password" class="block text-sm text-gray-800 dark:text-gray-200">
						Пароль
					</label>
                </div>

                <input type="password"
					v-model="login_info.password"
                    class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
            </div>

            <div class="mt-6">
                <div
					@click="loginClick"
                    class="w-full px-4 py-2 tracking-wide text-center text-white bg-gray-700 cursor-pointer transition-colors duration-200 transform rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
						Войти 
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	name: "LoginForm",
	setup (props, {emit}) {
		const login_info = reactive({
			username: "",
			password: ""
		})
		// functions
		const loginClick = () => {
			if (login_info.username.length > 0 && login_info.password.length > 0) {
				emit("login", login_info)
			} else {
				return null
			}
		}
		return {
			login_info,
			// functions
			loginClick
		}
	},
});
</script>
