import { Commit, ActionContext } from 'vuex';
import { 
	OrdersDataService,
} from '@/api/orders'

const state = {
	orders: null,
	orders_info: {
		count: null,
		pages_count: null,
		current_page: null,
	},
	current_order: null,
}
const mutations = {
	setOrders(state: Record<string,any>, orders: Array<Record<string,any>>) {
		state.orders = orders;
	},
	setOrdersInfo(state: Record<string,any>, info: Record<string,any>) {
		state.orders_info = {...info }
	},

	setCurrentOrder(state: Record<string,any>, order: Record<string,any>) {
		state.current_order = order;
	}
}
const getters = {
}
const actions = {
	async getOrdersAPI(
	context: ActionContext<any,any>, options: Record<string,any> = {}
	) {
		const access_token = context.rootState.authorization.access_token
		const resp_data: Record<string,any> = await OrdersDataService.getOrders(access_token, options)
		if (!resp_data) { return false; }
		if (!(resp_data.status == 200)) { return false; }
		context.commit('setOrders', resp_data.data.orders)
		context.commit('setOrdersInfo', resp_data.data.info)
	},
	async getOrderAPI(
		context: ActionContext<any,any>, order_id: string
	) {
		const access_token = context.rootState.authorization.access_token
		const resp_data: Record<string,any> = await OrdersDataService.getOrder(access_token, order_id)
		if (!resp_data) { return false; }
		if (!(resp_data.status == 200)) { return false; }
		context.commit('setCurrentOrder', resp_data.data.order)
	},
	async deleteOrderAPI(
		context: ActionContext<any,any>, order_id: string
	) {
		const access_token = context.rootState.authorization.access_token
		const resp_data: Record<string,any> = await OrdersDataService.deleteOrder(access_token, order_id)
		if (!resp_data) { return false; }
		if (!(resp_data.status == 200)) { return false; }
		await context.dispatch('getOrdersAPI')
	},
	async updateOrderAPI(
		context: ActionContext<any,any>, 
		{order_id, update_order} : {order_id: string, update_order: Record<string,any>}
	) {
		const access_token = context.rootState.authorization.access_token
		const resp_data: Record<string,any> = await OrdersDataService.updateOrder(access_token, order_id, update_order)
		if (!resp_data) { return false; }
		if (!(resp_data.status == 200)) { return false; }
		context.commit('setCurrentOrder', resp_data.data)
		await context.dispatch('getOrdersAPI')
		return true
	},

}

export default {
	namespaced: true,
	state,
	mutations,
	getters,
	actions,
}
