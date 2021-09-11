import apiClient from "./api_client";

class AuthDataServiceClass {
	async authAdmin(user_access_token: string): Promise<any> {
		const response: Record<string,any> = await apiClient.get("/users/auth-admin/", 
			{
				headers: {
					"Authorization": `Bearer ${user_access_token}`
				}
			}
			).catch(() => {
				return response
			});
		return response
	}
	async loginAdmin(username: string, password: string): Promise<any> {
		const formData = new FormData()
		formData.set('username', username)
		formData.set('password', password)
		const response: Record<string,any> = await apiClient.post("/users/token", formData
			).catch(() => {
				return response
			});
		return response
	}
}

export const AuthDataService = new AuthDataServiceClass()
