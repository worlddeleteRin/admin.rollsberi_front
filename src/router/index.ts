import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import MainPage from "../pages/MainPage.vue";

const ordersPage = () => import(/* webpackChunkName: "orders-page" */ "@/pages/OrdersPage.vue")

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "MainPage",
    component: MainPage,
  },
  {
	path: "/orders",
	name: "OrdersPage",
	component: ordersPage,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
