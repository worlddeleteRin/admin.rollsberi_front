import { ActionContext } from 'vuex';
import {
	ProductsDataService	
} from '@/api/products'


const state = {
}
const mutations = {
}
const getters = {
}
const actions = {
	async findProductsAPI(
		context: ActionContext<any,any>, search_string: string 
	) {
		console.log('search string is', search_string)
		const access_token = context.rootState.authorization.access_token;
		const resp_data: Record<string,any> = await ProductsDataService.findProducts(access_token, search_string)
		if (!resp_data) { return false; }
		if (!(resp_data.status == 200)) { return false; }
		console.log('resp data is', resp_data.data)
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
