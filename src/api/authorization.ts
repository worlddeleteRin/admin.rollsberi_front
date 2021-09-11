import apiClient from "./api_client";

class AuthDataServiceClass {
	async authAdmin(user_access_token: string): Promise<any> {
		const response: Record<string,any> = await apiClient.get("users/admin-auth/", 
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
}

export const AuthDataService = new AuthDataServiceClass()
