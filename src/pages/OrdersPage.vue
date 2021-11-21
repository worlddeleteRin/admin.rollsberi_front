<template>
<div 
	v-if="orders_loaded"
>
	<page-title
		title="Заказы"
	/>

	<a-table
		:data-source="orders"
        :pagination="false"
	>
		<a-table-column title="Клиент" key="customer_username">
			<template #default="{ record }">
				<div 
				class="flex items-center tracking-wide text-black text-md"
					v-if="record.customer_id"
				>
					<div class="p-2 mr-2 bg-green-400 rounded-full">
						<Icon icon="bx:bxs-user" class="text-white"/>
					</div>
                        {{ record.customer_username }}
				</div>
				<div
					class="flex items-center tracking-wide text-black text-md"
					v-else
				>
					<div class="p-2 mr-2 bg-blue-400 rounded-full">
						<Icon icon="bx:bxs-user" class="text-white"/>
					</div>
                        {{ record.guest_phone_number }}
				</div>
			</template>
		</a-table-column>

		<a-table-column title="Дата" key="date_created" data-index="date_created"/>

		<a-table-column title="Статус" key="status">
			<template #default="{ record }">
				<div
					class="px-3 py-1 text-white rounded-lg max-w-max"
					:style="'background-color: ' + record?.status.color"
				>
					{{ record?.status.name_display }}
				</div>
			</template>
		</a-table-column>

		<a-table-column title="Сумма">
			<template #default="{ record }">
				<div class="text-xl tracking-wider text-black">
				{{ record.cart?.total_amount }} &#8381; 
				</div>
			</template>
		</a-table-column>

		<a-table-column title="Действия">
			<template #default="{ record }">
				<div class="">
					<a-button
						type="primary"
						size="medium"
                        shape="circle"
						@click="goOrderPage(record)"
					>
						<Icon icon="akar-icons:edit" class="w-full text-lg" />
					</a-button>
					<a-popconfirm
						title="Вы уверены, что хотите удалить заказ?"
						ok-text="Да"
						cancel-text="Нет"
						@confirm="deleteOrder(record)"
					>
							<a-button
								type="dashed"
								size="medium"
                                shape="circle"
                                danger
                                class="ml-1"
							>
								<Icon icon="ant-design:delete-filled"
                                class="w-full text-lg"
                                />
							</a-button>
					</a-popconfirm>
				</div>
			</template>
		</a-table-column>

	</a-table>

	<!-- orders pagination -->
	<div class="mt-3"
		v-if="orders_info.pages_count > 0"
	>
		<a-pagination
			v-model:current="orders_current_page"
			:total="orders_info.pages_count * 10"
		>
		</a-pagination>
	</div>
	<!-- eof orders pagination -->

	<!-- new order button -->
    <div
        class="fixed bottom-10 right-10"
    >
        <a-button
            @click="goCreateOrderPage"
            type="primary"
            size="large"
            shape="circle"
            class=""
        >
            <Icon
                icon="akar-icons:plus"
                class="w-full h-full text-2xl px-2"
            />
        </a-button>
    </div>
	<!-- eof new order button -->

</div>

<!-- if orders not loaded block -->
<div v-else>
	Загрузка заказов...
</div>
<!-- eof order not loaded block -->
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
	name: "OrdersPage",
	setup () {
		const orders_loaded = ref(false)
		const store = useStore()
		const router = useRouter()
		// computed
		const orders = computed(() => store.state.orders.orders);
		const orders_info = computed(() => store.state.orders.orders_info);
		const orders_current_page = computed({
			get () {
				return orders_info.value.current_page
			},
			async set(new_value: string) {
				await store.dispatch("orders/getOrdersAPI", {"page": new_value})
				console.log('new pagination value is set', new_value)
			}
		});
		// functions
		onBeforeMount( async () => {
			if (orders.value) {
				orders_loaded.value = true
				return
			}
			// no orders, need load them
			await store.dispatch('orders/getOrdersAPI')
			orders_loaded.value = true
			return 
		});
		const goOrderPage = (order: Record<string,any>) => {
			console.log('order is', order)
			router.push('/orders/' + order.id)
		}
		const goCreateOrderPage = () => {
			router.push('/orders/new-order')
		}
		const deleteOrder = async (order: Record<string,any>) => {
            console.log('order is', order)
			const is_deleted = await store.dispatch('orders/deleteOrderAPI', order.id)
			// success message, if deleted, error if not
		}

		return {
			// ref
			orders_loaded,
			// computed
			orders,
			orders_current_page,
			orders_info,
			// functions
			goOrderPage,
			goCreateOrderPage,
			deleteOrder,
		}
	}
});
</script>
