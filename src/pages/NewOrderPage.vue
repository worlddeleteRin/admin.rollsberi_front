<template>
<div>

<page-title
	title="Новый заказ"
/>

<div 
	v-if="info_loaded"
>
	{{ checkout_common_info }}
	session id is {{ session_id }}
	{{ new_order_info }}

	<!-- chooise order taget -->
	<stage-title title="Выберите, для кого создается заказ" 
	/>

	<el-select
		v-model="new_order_info.order_target"
		placeholder="Новый заказ для..."
	>
		<el-option
			v-for="order_target in order_targets"
			:key="order_target.value"
			:label="order_target.label"
			:value="order_target.value"
		>
		</el-option>
	</el-select>
	<!-- eof choose order target -->

	<!-- select authorized user container -->
		<stage-title title="Choose user"/>
		<el-button
			@click="setModalState('new_order_add_user_open', true)"
			type="primary"
			size="medium"
		>
			choose user	
		</el-button>
	<!-- eof select authorized user container -->

	<!-- choose delivery method -->
	<div>
	<stage-title title="Выберите способ доставки"/>
		<el-select
			v-model="new_order_info.delivery_method"
			placeholder="Выберите способ доставки"
		>
			<el-option
				v-for="delivery_method in checkout_common_info.delivery_methods"
				:key="delivery_method.id"
				:label="delivery_method.name"
				:value="delivery_method.id"
			>
			</el-option>
		</el-select>				
	</div>
	<!-- eof choose delivery method -->

	<!-- choose payment method -->
	<div>
	<stage-title title="Выберите способ оплаты"/>
		<el-select
			v-model="new_order_info.payment_method"
			placeholder="Выберите способ оплаты"
		>
			<el-option
				v-for="payment_method in checkout_common_info.payment_methods"
				:key="payment_method.id"
				:label="payment_method.name"
				:value="payment_method.id"
			>
			</el-option>
		</el-select>				
	</div>
	<!-- eof choose payment method -->

	<!-- choose pickup address -->
	<div v-if="new_order_info.delivery_method == 'pickup'">
	<stage-title title="Выберите пункт выдачи заказа"/>
		<el-select
			v-model="new_order_info.pickup_address"
			placeholder="Выберите пункт выдачи заказа"
		>
			<el-option
				v-for="pickup_address in checkout_common_info.pickup_addresses"
				:key="pickup_address.id"
				:label="pickup_address.name"
				:value="pickup_address.id"
			>
			</el-option>
		</el-select>				
	</div>
	<!-- eof choose pickup address -->

	<!-- guest user phone -->
	<div v-if="new_order_info.order_target == 'guest_user'">
	<!-- need to add v-mask -->
		<stage-title title="Введите номер телефона клиента"/>
		<el-input
			placeholder="Номер телефона клиента"
			v-model="new_order_info.guest_phone_number"
			v-maska="phone_mask"
			@maska="setGuestUserPhone"
		>
		</el-input>
	</div>
	<!-- eof guest user phone -->

	<!-- guest delivery address -->
	<div v-if="new_order_info.order_target == 'guest_user' && new_order_info.delivery_method == 'delivery'">
		<stage-title title="Введите адрес доставки"/>
		<el-input
			placeholder="Напишите адрес доставки"
			v-model="new_order_info.guest_delivery_address"
		>
		</el-input>
	</div>
	<!-- eof guest delivery_address -->

	<!-- add order items section -->
	<div 
	class="">
		<stage-title title="Добавьте товары в заказ"/>
		<el-button
			@click="setModalState('new_order_add_product_open', true)"
			type="primary"
			size="medium"
		>
			Добавить товар в заказ
		</el-button>
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
		<el-button
			:disabled="!check_can_create_order"
			@click="createOrder"
			type="success"
		>
			Создать заказ
		</el-button>
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
	},
	setup (props, {emit}) {
		const store = useStore()
		const route = useRoute()
		const router = useRouter()
		// refs
		const info_loaded = ref(false)
		const phone_mask = "+7(###)-###-##-##"
		// reactive
		const new_order_info = reactive({
			authorized_user: null,
			order_target: '',
			guest_phone_number: '',
			guest_phone_number_raw: '',
			guest_delivery_address: '',
			delivery_method: '',
			payment_method: '',
			pickup_address: ''
		})
		// new order items 

		const order_targets = [
			{value: "guest_user", label: "Гость"},
			{value: "authorized_user", label: "Авторизованный пользователь"},
		]

		// computed
		// check if can create order
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
			// reactive order
			new_order_info,
			// orders items
			// computed
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
		}
	}
});
</script>
