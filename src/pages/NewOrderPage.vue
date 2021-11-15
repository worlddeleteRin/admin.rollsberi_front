<template>
<div>

<page-title
	title="Новый заказ"
/>

<div 
	v-if="info_loaded"
>
    {{ new_order_info }}

	<!-- chooise order taget -->
	<stage-title title="Выберите, для кого создается заказ" 
	/>

	<a-select
		v-model:value="new_order_info.order_target"
		placeholder="Новый заказ для..."
	>
		<a-select-option
			v-for="order_target in order_targets"
			:key="order_target.value"
			:value="order_target.value"
		>
            {{ order_target.label }}
		</a-select-option>
	</a-select>
	<!-- eof choose order target -->

	<!-- select authorized user container -->
	<div 
		v-if="new_order_info.order_target == 'authorized_user'"
	>
		<stage-title title="Выберите клиента"/>
		<!-- open select user modal button -->
		<a-button
			v-if="authorizedUserEmpty"
			@click="setModalState('new_order_add_user_open', true)"
			type="primary"
			size="medium"
		>
			Выбрать клиента	
		</a-button>
		<!-- eof open select user modal button -->
		<!-- selected user -->
		<div v-if="!authorizedUserEmpty"
		class="max-w-[400px] bg-gray-100 flex rounded-md items-center px-3 py-2 justify-between flex-shrink w-full">
			<div class="flex flex-shrink">
				<div>
					<Icon icon="ant-design:user-outlined" width="25"/>
				</div>
				<div>
					{{ new_order_info.authorized_user.username }}, 
					{{ new_order_info.authorized_user.name }}
				</div>
			</div>
			<div class="flex items-center">
				<div class="px-2 py-1 bg-red-100 rounded-lg">
					🎉 {{ new_order_info.authorized_user.bonuses }}
				</div>
				<div @click="setAuthorizedUser({})">
					<Icon icon="clarity:remove-solid" width="25"
						class="ml-1 text-red-500 cursor-pointer"
					/>
				</div>
			</div>
		</div>
		<!-- eof selected user -->
		<!-- selected user addresses -->
		<div v-if="!authorizedUserEmpty && new_order_info.delivery_method == 'delivery'">
			<a-select
				v-model:value="new_order_info.delivery_address"
				placeholder="Выберите адрес доставки"
			>
				<a-select-option
					v-for="address in user_delivery_addresses"
					:key="address.id"
					:value="address.id"
				>
                    {{ address.address_display }}
				</a-select-option>
			</a-select>
				<a-button
					@click="setModalState('add_user_delivery_address_open', true)"
					type="primary"
					class="ml-2"
				>
					Добавить новый адрес
				</a-button>
		</div>
		<!-- eof selected user addresses -->
	</div>
	<!-- eof select authorized user container -->

	<!-- choose delivery method -->
	<div>
	<stage-title title="Выберите способ доставки"/>
		<a-select
			v-model:value="new_order_info.delivery_method"
			placeholder="Выберите способ доставки"
		>
			<a-select-option
				v-for="delivery_method in checkout_common_info.delivery_methods"
				:key="delivery_method.id"
				:value="delivery_method.id"
			>
                {{ delivery_method.name }}
			</a-select-option>
		</a-select>				
	</div>
	<!-- eof choose delivery method -->

	<!-- choose payment method -->
	<div>
	<stage-title title="Выберите способ оплаты"/>
		<a-select
			v-model:value="new_order_info.payment_method"
			placeholder="Выберите способ оплаты"
		>
			<a-select-option
				v-for="payment_method in checkout_common_info.payment_methods"
				:key="payment_method.id"
				:value="payment_method.id"
			>
                {{ payment_method.name }}
			</a-select-option>
		</a-select>				
	</div>
	<!-- eof choose payment method -->

	<!-- choose pickup address -->
	<div v-if="new_order_info.delivery_method == 'pickup'">
	<stage-title title="Выберите пункт выдачи заказа"/>
		<a-select
			v-model:value="new_order_info.pickup_address"
			placeholder="Выберите пункт выдачи заказа"
		>
			<a-select-option
				v-for="pickup_address in checkout_common_info.pickup_addresses"
				:key="pickup_address.id"
				:value="pickup_address.id"
			>
                {{ pickup_address.name }}
			</a-select-option>
		</a-select>				
	</div>
	<!-- eof choose pickup address -->

	<!-- guest user phone -->
	<div v-if="new_order_info.order_target == 'guest_user'">
	<!-- need to add v-mask -->
		<stage-title title="Введите номер телефона клиента"/>
		<a-input
			placeholder="Номер телефона клиента"
			v-model:value="new_order_info.guest_phone_number"
			v-maska="phone_mask"
			@maska="setGuestUserPhone"
		>
		</a-input>
	</div>
	<!-- eof guest user phone -->

	<!-- guest delivery address -->
	<div v-if="new_order_info.order_target == 'guest_user' && new_order_info.delivery_method == 'delivery'">
		<stage-title title="Введите адрес доставки"/>
		<a-input
			placeholder="Напишите адрес доставки"
			v-model:value="new_order_info.guest_delivery_address"
		>
		</a-input>
	</div>
	<!-- eof guest delivery_address -->

	<!-- add order items section -->
	<div 
	class="">
		<stage-title title="Добавьте товары в заказ"/>
		<a-button
			@click="setModalState('new_order_add_product_open', true)"
			type="primary"
			size="medium"
		>
			Добавить товар в заказ
		</a-button>
		<!-- order items -->
		<div v-if="cart">	
			<div
				v-for="item in cart.line_items"
				:key="item"
			>
				<cart-line-item 
					:item="item"
					@delete-quantity="deleteCartItemQuantity"
					@add-quantity="addCartItemQuantity"
					@remove-item="removeCartItem"
				/>
			</div>
		</div>
		<!-- eof order items -->
		<!-- cart summary -->
		<div
			v-if="cart && cart.line_items.length > 0"
			class="flex flex-col items-center flex-1 w-11/12"
		>
			<div>Цена без скидок: 
				<span class="text-md">{{ cart.base_amount }}</span>
			</div>

			<div>Общая сумма скидки: 
				<span class="text-md">{{ cart.discount_amount }}</span>
			</div>
			<div>Итоговая стоимость: 
				<span class="text-2xl">{{ cart.total_amount }}</span>
			</div>
		</div>
		<!-- eof cart summary -->

	</div>
	<!-- eof add order items section -->

	<!-- create order button -->
	<div class="mt-3">
		<a-button
			:disabled="!check_can_create_order"
			@click="createOrder"
			type="success"
		>
			Создать заказ
		</a-button>
	</div>
	<!-- eof create order button -->

</div>

<!-- if orders not loaded block -->
<div v-else>
	Загрузка данных...
</div>
<!-- eof order not loaded block -->

<!-- modals -->
	<!-- add product modal -->
	<order-add-product-modal
		v-if="modals.new_order_add_product_open"
		@close-modal="setModalState('new_order_add_product_open', false)"
	/>
	<order-add-user-modal
		v-if="modals.new_order_add_user_open"
		@close-modal="setModalState('new_order_add_user_open', false)"
		@set-order-user="setAuthorizedUser"
	/>
	<create-delivery-address-modal
		v-if="modals.add_user_delivery_address_open"
		@close-modal="setModalState('add_user_delivery_address_open', false)"
		@create-delivery-address="createUserDeliveryAddress"
	/>
	<!-- eof add product modal -->
<!-- eof modals -->

</div>

</template>

<script lang="ts">
import { defineComponent, onBeforeMount, computed, ref, reactive } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { ElNotification } from 'element-plus';
import CreateDeliveryAddressModal from '@/components/modals/CreateDeliveryAddressModal.vue';

// local components
import CartLineItem from '@/components/cart/CartLineItem.vue';

// modals
import OrderAddProductModal from '@/components/modals/OrderAddProductModal.vue';
import OrderAddUserModal from '@/components/modals/OrderAddUserModal.vue';

export default defineComponent({
	name: "NewOrderPage",
	components: {
		OrderAddProductModal,
		OrderAddUserModal,
		CartLineItem,
		CreateDeliveryAddressModal,
	},
	setup (props, {emit}) {
		const store = useStore()
		const route = useRoute()
		const router = useRouter()
		// refs
		const info_loaded = ref(false)
		const phone_mask = "+7(###)-###-##-##"
		var user_delivery_addresses = ref(null)
		// reactive
		const new_order_info = reactive({
			authorized_user: {} as Record<string,any>,
			delivery_address: null as unknown,
			order_target: null,
			guest_phone_number: '',
			guest_phone_number_raw: '',
			guest_delivery_address: '',
			delivery_method: null,
			payment_method: null,
			pickup_address: null,
		})
		// new order items 

		const order_targets = [
			{value: "guest_user", label: "Гость"},
			{value: "authorized_user", label: "Авторизованный пользователь"},
		]

		// computed
		// check if can create order
			// check, if authorized user is empty
		const authorizedUserEmpty = computed( () => Object.keys(new_order_info.authorized_user).length == 0);
		const check_can_create_order = computed(() => {
			var b = true
			if (!cart.value) {return false}
			if (cart.value.line_items.length == 0) {return false}
			if (new_order_info.payment_method == '') {return false}
			if (new_order_info.delivery_method == '') { return false}
			if (new_order_info.order_target == '') {return false}
			if (new_order_info.order_target == 'guest_user') {
				if (new_order_info.guest_phone_number_raw.length != 11) { return false }
				if (new_order_info.delivery_method == 'delivery' && new_order_info.guest_delivery_address == '') {return false}
			}
			if (new_order_info.delivery_method == 'pickup' && new_order_info.pickup_address == '') { return false }
			return b
		});
		// new order items
		const cart = computed(() => store.state.cart.cart);
		const checkout_common_info = computed(() => store.state.site.common_info.checkout);
		const session_id = computed(() => store.state.site.session_id);
		// modals states
		const modals = computed(() => store.state.site.modals);
		// functions
		onBeforeMount( async () => {
			await store.dispatch('site/getCheckoutCommonInfoAPI')
			await store.dispatch('cart/getCartAPI')
			info_loaded.value = true
			return
		});
		const setGuestUserPhone = (e: Record<string,any>) => {
			const raw_val = e.target.getAttribute('data-mask-raw-value')
			new_order_info.guest_phone_number_raw = '7' + raw_val
		}
		const setModalState = (modal_name: string, is_open: boolean) => {
			store.commit('site/setModalState', {modal_name: modal_name, is_open: is_open})
		}
		// cart functions
		const addCartItemQuantity = async (item: Record<string,any>) => {
			await store.dispatch('cart/addLineItemQuantityAPI', {line_item: item})
		}
		const deleteCartItemQuantity = async (item: Record<string,any>) => {
			await store.dispatch('cart/removeLineItemQuantityAPI', {line_item: item})
		}
		const removeCartItem = async (item: Record<string,any>) => {
			await store.dispatch('cart/removeLineItemAPI', {line_item: item})
		}
		// set authorized user to order
		const setAuthorizedUser = async (user: Record<string,any>) =>  {
			new_order_info.authorized_user = user
			if (new_order_info.authorized_user && Object.keys(new_order_info.authorized_user).length > 0) {
				const delivery_addresses = await store.dispatch('users/getUserAddressesAPI', user.id)
				if (!delivery_addresses) { return false;}
				user_delivery_addresses.value = delivery_addresses
			} else {
				user_delivery_addresses.value = null
				new_order_info.delivery_address = null
			}

		}
			// create user delivery address
		const createUserDeliveryAddress = async (new_address: Record<string,any>) => {
			var new_delivery_addresses = await store.dispatch("users/createUserDeliveryAddressAPI", 
			{ new_address: new_address, user_id: new_order_info.authorized_user.id })
			if (!new_delivery_addresses) { return false; }
			user_delivery_addresses.value = new_delivery_addresses
			new_order_info.delivery_address = new_delivery_addresses[0].id
		}
			// create order
		const createOrder = async () => {
			if (!check_can_create_order.value) { return false }
			const order_created: boolean = await store.dispatch('cart/createOrderAPI', new_order_info)
			if (!order_created) { 
				return ElNotification({title: 'Ошибка во время создания заказа', type: 'error'})
			}
			ElNotification({title: 'Заказ успешно создан', type: 'success'})
			await store.dispatch('orders/getOrdersAPI')
			return router.push('/orders')
		}

		return {
			order_targets,
			// ref
			info_loaded,
			phone_mask,
			user_delivery_addresses,
			// reactive order
			new_order_info,
			// orders items
			// computed
			authorizedUserEmpty,
			checkout_common_info,
			modals,
			check_can_create_order,
			// order cart
			cart,
			session_id,
			// functions
			createOrder,
			setGuestUserPhone,
			setModalState,
				// cart functions
			addCartItemQuantity,
			deleteCartItemQuantity,
			removeCartItem,
				// set user to order
			setAuthorizedUser,
				// create user delivery address
			createUserDeliveryAddress,
		}
	}
});
</script>
