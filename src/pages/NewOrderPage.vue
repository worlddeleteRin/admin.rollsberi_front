<template>
<div>

<page-title
	title="Новый заказ"
/>

<div 
	v-if="info_loaded"
>
	{{ checkout_common_info }}
	{{ guest_phone_number_raw }}

	<!-- chooise order taget -->
	<stage-title title="Выберите, для кого создается заказ" 
	/>

	<el-select
		v-model="order_target"
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

	<!-- choose delivery method -->
	<div>
	<stage-title title="Выберите способ доставки"/>
		<el-select
			v-model="delivery_method"
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
			v-model="payment_method"
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
	<div v-if="delivery_method == 'pickup'">
	<stage-title title="Выберите пункт выдачи заказа"/>
		<el-select
			v-model="pickup_address"
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
	<div v-if="order_target == 'guest_user'">
	<!-- need to add v-mask -->
		<stage-title title="Введите номер телефона клиента"/>
		<el-input
			placeholder="Номер телефона клиента"
			v-model="guest_phone_number"
			v-maska="phone_mask"
			@maska="setGuestUserPhone"
		>
		</el-input>
	</div>
	<!-- eof guest user phone -->

	<!-- guest delivery address -->
	<div v-if="order_target == 'guest_user' && delivery_method == 'delivery'">
		<stage-title title="Введите адрес доставки"/>
		<el-input
			placeholder="Напишите адрес доставки"
			v-model="guest_delivery_address"
		>
		</el-input>
	</div>
	<!-- eof guest delivery_address -->

	<!-- add order items section -->
	<div class="">
		<stage-title title="Добавьте товары в заказ"/>
		<el-button
			@click="setModalState('new_order_add_product_open', true)"
			type="primary"
			size="medium"
		>
			Добавить товар в заказ
		</el-button>
		<!-- order items -->
		<div>	
			items are here
			<div
				v-for="item in order_cart"
				:key="item"
			>
				{{ item }}
			</div>
		</div>
		<!-- eof order items -->

	</div>
	<!-- eof add order items section -->

</div>

<!-- if orders not loaded block -->
<div v-else>
	Загрузка данных...
</div>
<!-- eof order not loaded block -->

<!-- modals -->
	<order-add-product-modal
		v-if="modals.new_order_add_product_open"
		@close-modal="setModalState('new_order_add_product_open', false)"
	/>
<!-- eof modals -->

</div>

</template>

<script lang="ts">
import { defineComponent, onBeforeMount, computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

import OrderAddProductModal from '@/components/modals/OrderAddProductModal.vue';

export default defineComponent({
	name: "NewOrderPage",
	components: {
		OrderAddProductModal,
	},
	setup (props, {emit}) {
		const store = useStore()
		const route = useRoute()
		// refs
		const info_loaded = ref(false)
		const phone_mask = "+7(###)-###-##-##"
		//
		const order_target = ref('')
		const guest_phone_number = ref('')
		const guest_phone_number_raw = ref('')
		const guest_delivery_address = ref('')
		const delivery_method = ref('')
		const payment_method = ref('')
		const pickup_address = ref('')
		// new order items 

		const order_targets = [
			{value: "guest_user", label: "Гость"},
			{value: "authorized_user", label: "Авторизованный пользователь"},
		]

		// computed
		// new order items
		const order_cart = computed(() => store.state.orders.order_cart);
		const checkout_common_info = computed(() => store.state.site.common_info.checkout);
		// modals states
		const modals = computed(() => store.state.site.modals);
		// functions
		onBeforeMount( async () => {
			await store.dispatch('site/getCheckoutCommonInfoAPI')
			info_loaded.value = true
			return
		});
		const setGuestUserPhone = (e: Record<string,any>) => {
			const raw_val = e.target.getAttribute('data-mask-raw-value')
			guest_phone_number_raw.value = '7' + raw_val
		}
		const setModalState = (modal_name: string, is_open: boolean) => {
			store.commit('site/setModalState', {modal_name: modal_name, is_open: is_open})
		}

		return {
			order_targets,
			// ref
			info_loaded,
			phone_mask,
			//
			order_target,
			guest_phone_number,
			guest_phone_number_raw,
			guest_delivery_address,
			delivery_method,
			payment_method,
			pickup_address,
			// orders items
			// computed
			checkout_common_info,
			modals,
			// order cart
			order_cart,
			// functions
			setGuestUserPhone,
			setModalState,
		}
	}
});
</script>
