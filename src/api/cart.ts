import apiClient from "./api_client";

class CartDataServiceClass {
	async getCart(session_id: string | null): Promise<any> {
		const response: Record<string,any> = await apiClient.get(
		"carts/" + session_id,
		).catch(() => {
			return response 
		});
		return response 
	}
	async createCart(cart_items: Array<Record<string,any>>, session_id: string | null): Promise<any> {
		const response: Record<string,any> = await apiClient.post(
		"carts/" + session_id, 
		{
			"line_items": cart_items
		},
		).catch(() => {
			return response 
		});
		return response 
	}
	async addCartItems(cart_id: string, cart_items: Array<Record<string,any>>): Promise<any> {
		const response: Record<string,any> = await apiClient.post(
		"carts/" + cart_id + "/items",
	//	`"carts/${cart_id}/items"`, 
		{
			"line_items": cart_items
		},
		).catch(() => {
			return response 
		});
		return response 	
	}
	async removeCartItem(cart_id: string, item_id: string): Promise<any> {
		const response: Record<string,any> = await apiClient.delete(
		"carts/" + cart_id + "/items/" + item_id, 
		).catch(() => {
			return response 
		});
		return response 	
	}
	async updateCartItem(cart_id: string, item_id: string, new_item: Record<string,any>): Promise<any> {
		const response: Record<string,any> = await apiClient.patch(
		"carts/" + cart_id + "/items/" + item_id, 
		{
			"line_item": new_item
		}
		).catch(() => {
			return response 
		});
		return response 	
	}
	// order section
	// create order
	async createOrderAdmin(line_items: Array<Record<string,any>>, user_access_token: string, session_id: string | null, checkout_info: Record<string,any>): Promise<any> {
		const delivery_address = checkout_info.delivery_address == null ? null: checkout_info.delivery_address.id
		const pickup_address = checkout_info.pickup_address == null ? null: checkout_info.pickup_address.id
		let customer_id = checkout_info.authorized_user == null ? null: checkout_info.authorized_user.id
		if (checkout_info.order_target == 'guest_user') {
			customer_id = null
		}
		const response: Record<string,any> = await apiClient.post(
		"orders/admin",
		{
			"customer_id": customer_id,
			"customer_session_id": session_id,
			"line_items": line_items,
			"delivery_method": checkout_info.delivery_method,
			"payment_method": checkout_info.payment_method,
			"delivery_address": delivery_address,
			"pickup_address": pickup_address,
			"guest_delivery_address": checkout_info.guest_delivery_address,
			"guest_phone_number": checkout_info.guest_phone_number_raw,
		},
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
	// get checkout common info 'delivery_methods', 'payment_methods', 'pickup_addresses'
	async getCheckoutCommonInfo(): Promise<any> {
		const response: Record<string,any> = await apiClient.get(
		"site/checkout-common-info",
		).catch(() => {
			return response 
		});
		return response 	
	}

}

export const CartDataService = new CartDataServiceClass()
