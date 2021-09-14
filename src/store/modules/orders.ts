import { Commit, ActionContext } from 'vuex';
import { 
	AuthDataService,
} from '@/api/authorization'

const state = {
	orders: null,
}
const mutations = {

}
const getters = {
}
const actions = {
	async checkUserAuth(
	context: ActionContext<any,any>
	) {
		const resp_data: Record<string,any> = await AuthDataService.authAdmin(access_token)
	},

}

export default {
	namespaced: true,
	state,
	mutations,
	getters,
	actions,
}
