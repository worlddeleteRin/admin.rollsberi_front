import apiClient from "./api_client";

class ProductsDataServiceClass {

	async findProducts(user_access_token: string, search_string: string): Promise<any> {
		const response: Record<string,any> = await apiClient.get(
		"/products/search", 
			{
				headers: {
					"Authorization": `Bearer ${user_access_token}`
				},
				params: {
					"search": search_string,
				}
			}
			).catch(() => {
				return response
			});
		return response
	};
}

export const ProductsDataService = new ProductsDataServiceClass()
