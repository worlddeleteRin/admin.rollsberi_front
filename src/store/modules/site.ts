import { ActionContext } from 'vuex';
import {
	SiteDataService
} from '@/api/site'


const state = {
	order_statusses: null,
	common_info: {
		phone: "some phone is here",
		checkout: null,
	},
	modals: {
		new_order_add_product_open: false,
		new_order_add_user_open: false,
	},
	session_id: null,
}
const mutations = {
	setOrderStatusses(state: Record<string,any>, order_statusses: Record<string,any>) {
		state.order_statusses = order_statusses
	},
	setCheckoutCommonInfo(state: Record<string,any>, checkout_common_info: Record<string,any>) {
		state.common_info.checkout = checkout_common_info
	},
	setModalState(state: Record<string,any>, {modal_name, is_open}: {modal_name: string, is_open: boolean}) {
		console.log('call mutation', modal_name, is_open)
		state.modals[modal_name] = is_open
	},
	setSessionId(state: Record<string,any>, session_id: string) {
		state.session_id = session_id
	},
}
const getters = {
}
const actions = {
	async getCheckoutCommonInfoAPI(
		context: ActionContext<any,any>, 
	) {
		const resp_data: Record<string,any> = await SiteDataService.getCheckoutCommonInfo()
		if (!resp_data) { return false; }
		if (!(resp_data.status == 200)) { return false; }
		context.commit('setCheckoutCommonInfo', resp_data.data)
	},
	async checkGetSessionId(
		context: ActionContext<any,unknown>
	) {
		const session_id = localStorage.getItem("session_id")
		if (!session_id) {
			context.dispatch("getSessionIdAPI")
		} else {
			context.commit('setSessionId', session_id)
			return true
		}
	},
	async getSessionIdAPI(
		context: ActionContext<any,unknown>
	) {
		const response = await SiteDataService.getSessionId()
		if (response && response.status == 200) {
			context.commit('setSessionId', response.data.session_id)
			localStorage.setItem('session_id', response.data.session_id)
			return true
		}
		return false
	},
	async getOrderStatussesAPI(
		context: ActionContext<any,any>, 
	) {
		const access_token = context.rootState.authorization.access_token
		const resp_data: Record<string,any> = await SiteDataService.getOrderStatusses(access_token)
		if (!resp_data) { return false; }
		if (!(resp_data.status == 200)) { return false; }
		context.commit('setOrderStatusses', resp_data.data)
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	getters,
	actions,
}
