import { Commit, ActionContext } from 'vuex';
import { 
	OrdersDataService,
} from '@/api/orders'

const state = {
	orders: null,
}
const mutations = {
	setOrders(state: Record<string,any>, orders: Array<Record<string,any>>) {
		state.orders = orders;
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
}

export default {
	namespaced: true,
	state,
	mutations,
	getters,
	actions,
}
