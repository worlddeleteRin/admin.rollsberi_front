import { Commit, ActionContext } from 'vuex';
import { 
	UsersDataService,
} from '@/api/users'

const state = {
}
const mutations = {

}
const getters = {
}
const actions = {
	async findUsersAPI(
		context: ActionContext<any,any>, 
		search_string: string,
	) {
		const access_token = context.rootState.authorization.access_token 
		if (!access_token) { return null }
		const resp_data: Record<string,any> = await UsersDataService.findUsers(access_token, search_string)
		if (!resp_data || !(resp_data.status == 200)) { return false }
		return resp_data.data
	},
	async getUserAddressesAPI(
		context: ActionContext<any,any>, 
		user_id: string,
	) {
		const access_token = context.rootState.authorization.access_token 
		if (!access_token) { return null }
		const resp_data: Record<string,any> = await UsersDataService.getUserAddresses(access_token, user_id)
		if (!resp_data || !(resp_data.status == 200)) { return false }
		return resp_data.data
	},
	async createUserDeliveryAddressAPI(
		context: ActionContext<any,any>, 
		{user_id, new_address}: {user_id: string, new_address: Record<string,any>} 

	) {
		const access_token = context.rootState.authorization.access_token 
		if (!access_token) { return null }
		const resp_data: Record<string,any> = await UsersDataService.createUserDeliveryAddress(access_token, user_id, new_address)
		if (!resp_data || !(resp_data.status == 200)) { return false }
		return resp_data.data
	},
	
}

export default {
	namespaced: true,
	state,
	mutations,
	getters,
	actions,
}
