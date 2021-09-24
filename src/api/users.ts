import apiClient from "./api_client";

class UsersDataServiceClass{
	async findUsers(user_access_token: string, search_string: string): Promise<any> {
		const response: Record<string,any> = await apiClient.get("/users/search/", 
			{
				headers: {
					"Authorization": `Bearer ${user_access_token}`
				},
				params: {
					"search": search_string,
				},
			}
			).catch(() => {
				return response
			});
		return response
	}
	async getUserAddresses(user_access_token: string, user_id: string): Promise<any> {
		const response: Record<string,any> = await apiClient.get(
		"/users/" + user_id + "/delivery-addresses/", 
			{
				headers: {
					"Authorization": `Bearer ${user_access_token}`
				},
			}
			).catch(() => {
				return response
			});
		return response
	}
	async createUserDeliveryAddress(user_access_token: string, user_id: string, new_address: Record<string,any>): Promise<any> {
		const response: Record<string,any> = await apiClient.post(
			"/users/" + user_id + "/delivery-address/", 
			{...new_address},
			{
				headers: {
					"Authorization": `Bearer ${user_access_token}`
				},
			}
			).catch(() => {
				return response
			});
		return response
	}
}

export const UsersDataService = new UsersDataServiceClass()
