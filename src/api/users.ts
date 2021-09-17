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
}

export const UsersDataService = new UsersDataServiceClass()
