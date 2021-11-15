<template>
<div class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30"
	@click="closeModal"	
>
</div>

<div class="fixed top-1/2 left-1/2 w-11/12 h-full max-w-[700px] max-h-[500px] bg-white -translate-x-1/2 -translate-y-1/2 rounded-md px-4 py-4">
<div class="relative w-full h-full overflow-hidden">
	<div>
		<page-title
			title="Добавление пользователя к заказу"
			class="mb-3"
		/>
		<a-input
			:value="user_search_username"
			@change="inputUserUsername"
			placeholder="Начните набирать логин клиента (номер телефона)..."
		>
		</a-input>
	</div>


	<div 
	v-if="!found_users"
	class="flex items-center justify-center mt-5 text-2xl tracking-wide text-gray-400">
		Результаты поиска
	</div>

	<div 
	v-if="found_users && found_users.length == 0"
	class="flex items-center justify-center mt-5 text-2xl tracking-wide text-gray-400">
		Клиенты не найден
	</div>

	<div
		v-if="found_users && found_users.length > 0"
		class="max-h-full mt-4 overflow-y-scroll h-11/12"
	>
		<div
			v-for="user in found_users"
			:key="user.id"
			class="px-4 py-2 mx-4 mx-auto my-2 rounded-md bg-green-50"
		>
			<div class="flex items-center">
				<div class="flex flex-col ml-3">
					<div>{{ user.username }}</div>
					<div>{{ user.name }}</div>
				</div>
				<a-button 
				@click="selectUserClick(user)"
				type="primary" class="h-5">
					Выбрать
				</a-button>
			</div>
		</div>
	</div>

</div>
</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
	name: "OrderAddProductModal",
	emits: ['close-modal', 'set-order-user'],
	setup (props, {emit}) {
		const store = useStore()
		// refs
		const user_search_username = ref('')
		const found_users = ref(null)
		// functions
		const closeModal = () => emit('close-modal')
		const inputUserUsername = async (e: any) => {
			found_users.value = null
			console.log('e is ', e)
			user_search_username.value = e.target.value
			if (user_search_username.value.length > 3) {
				await findUsers(user_search_username.value)
			}
		}
		const findUsers = async (search_string: string) => {
			found_users.value = await store.dispatch("users/findUsersAPI", search_string)
		}
		const selectUserClick = async (user: Record<string,any>) => {
			emit('set-order-user', user)
			emit('close-modal')
			//store.dispatch('cart/addLineItemAPI', {product: product})
		}
		return {
			// refs
			user_search_username,
			found_users,
			// functions
			closeModal,
			inputUserUsername,
			selectUserClick,
		}
	}
});
</script>
