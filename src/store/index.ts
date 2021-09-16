import { createStore } from "vuex";
import site from '@/store/modules/site.ts';
import authorization from '@/store/modules/authorization.ts';
import orders from '@/store/modules/orders.ts';
import products from '@/store/modules/products.ts';
import cart from '@/store/modules/cart.ts';

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
	site,
	authorization,
	orders,
	products,
	cart,
  },
});
