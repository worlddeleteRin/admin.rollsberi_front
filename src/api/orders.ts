import apiClient from "./api_client";

class OrdersDataServiceClass {
	async getOrders(user_access_token: string, options: Record<string,any> = {}): Promise<any> {
		const response: Record<string,any> = await apiClient.get("/orders", 
			{
				headers: {
					"Authorization": `Bearer ${user_access_token}`
				},
				params: {...options},
			}
			).catch(() => {
				return response
			});
		return response
	}
}

export const OrdersDataService = new OrdersDataServiceClass()
