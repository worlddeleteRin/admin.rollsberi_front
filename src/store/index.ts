import { createStore } from "vuex";
import site from '@/store/modules/site.ts';
import authorization from '@/store/modules/authorization.ts';

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
	site,
	authorization,
  },
});
