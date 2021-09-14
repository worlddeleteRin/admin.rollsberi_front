import { createStore } from "vuex";
import site from '@/store/modules/site.ts';
import authorization from '@/store/modules/authorization.ts';
import orders from '@/store/modules/orders.ts';

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
	site,
	authorization,
	orders,
  },
});
