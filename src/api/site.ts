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
}

export const SiteDataService = new SiteDataServiceClass()
