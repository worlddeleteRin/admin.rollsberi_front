import { Commit, ActionContext } from 'vuex';
import { 
	AuthDataService,
} from '@/api/authorization'

const state = {
	is_authorized: false,
	access_token: null,
	user_info: null,
}
const mutations = {
	setUserAuthorized(state: Record<string,any>, is_authorized: boolean) {
		state.is_authorized = is_authorized
	},
	setUserAccessToken(state: Record<string,any>, access_token: string) {
		state.access_token = access_token 
	},
	setUserInfo(state: Record<string,any>, user_info: Record<string,any>) {
		state.user_info = user_info
	},
}
const getters = {
}
const actions = {
	async checkUserAuth(
	context: ActionContext<any,any>
	) {
		const access_token = localStorage.getItem("user_access_token")	
		console.log("access token is", access_token)
		if (!access_token) {
			return null
		}
		context.commit("setUserAccessToken", access_token)
		const resp_data: Record<string,any> = await AuthDataService.authAdmin(access_token)
		console.log('resp data is', resp_data)
		if (resp_data.token_valid && resp_data.user_data) {
			context.commit('setUserAuthorized', true)
			context.commit('setUserInfo', resp_data.user_data)
		} else {
			// if token is no longer valid, remove saved access token and make user not authorized
			context.commit('setUserAuthorized', false)
			context.commit('setUserInfo', null)
			context.commit('setUserAccessToken', null)
			localStorage.removeItem("user_access_token")
		}
		console.log('user is', resp_data.user_data)
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	getters,
	actions,
}
