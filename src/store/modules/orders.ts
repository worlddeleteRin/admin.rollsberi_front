import { Commit, ActionContext } from 'vuex';
import { 
	OrdersDataService,
} from '@/api/orders'

const state = {
	orders: null,
	current_order: null,
}
const mutations = {
	setOrders(state: Record<string,any>, orders: Array<Record<string,any>>) {
		state.orders = orders;
	},
	setCurrentOrder(state: Record<string,any>, order: Record<string,any>) {
		state.current_order = order;
	}
}
const getters = {
}
const actions = {
	async getOrdersAPI(
	context: ActionContext<any,any>, options: Record<string,any>
	) {
		const access_token = context.rootState.authorization.access_token
		const resp_data: Record<string,any> = await OrdersDataService.getOrders(access_token, options)
		if (!resp_data) { return false; }
		if (!(resp_data.status == 200)) { return false; }
		context.commit('setOrders', resp_data.data.orders)
	},
	async getOrderAPI(
		context: ActionContext<any,any>, order_id: string
	) {
		const access_token = context.rootState.authorization.access_token
		const resp_data: Record<string,any> = await OrdersDataService.getOrder(access_token, order_id)
		if (!resp_data) { return false; }
		if (!(resp_data.status == 200)) { return false; }
		context.commit('setCurrentOrder', resp_data.data.order)
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	getters,
	actions,
}
