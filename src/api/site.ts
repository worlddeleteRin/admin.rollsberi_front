import apiClient from "./api_client";

class SiteDataServiceClass {

	async getCheckoutCommonInfo(): Promise<any> {
		const response: Record<string,any> = await apiClient.get(
		"/site/checkout-common-info", 
		).catch(() => {
				return response
			});
		return response
	};
	async getSessionId(): Promise<any> {
		const response: Record<string,any> = await apiClient.get(
		"session", 
		).catch(() => {
			return response 
		});
		return response 
	};
	async getOrderStatusses(user_access_token: string): Promise<any> {
		const response: Record<string,any> = await apiClient.get(
		"/site/order-statusses/", 
		{
			headers: {
				"Authorization": `Bearer ${user_access_token}`
			},
		}
		).catch(() => {
			return response 
		});
		return response 
	};
}

export const SiteDataService = new SiteDataServiceClass()
