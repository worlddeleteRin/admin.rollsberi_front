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
	};
	async getOrder(user_access_token: string, order_id: string): Promise<any> {
		const response: Record<string,any> = await apiClient.get(
		"/orders/" + order_id, 
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

export const OrdersDataService = new OrdersDataServiceClass()
