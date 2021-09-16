import { ActionContext } from 'vuex';
import {
	SiteDataService
} from '@/api/site'


const state = {
	common_info: {
		phone: "some phone is here",
		checkout: null,
	},
	modals: {
		new_order_add_product_open: false,
	},
}
const mutations = {
	setCheckoutCommonInfo(state: Record<string,any>, checkout_common_info: Record<string,any>) {
		state.common_info.checkout = checkout_common_info
	},
	setModalState(state: Record<string,any>, {modal_name, is_open}: {modal_name: string, is_open: boolean}) {
		console.log('call mutation', modal_name, is_open)
		state.modals[modal_name] = is_open
	}
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
}

export default {
	namespaced: true,
	state,
	mutations,
	getters,
	actions,
}
