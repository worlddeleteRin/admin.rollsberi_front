import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import MainPage from "../pages/MainPage.vue";

const ordersPage = () => import(/* webpackChunkName: "orders-page" */ "@/pages/OrdersPage.vue")
const orderPage = () => import(/* webpackChunkName: "order-page" */ "@/pages/OrderPage.vue")
const newOrderPage = () => import(/* webpackChunkName: "new-order-page" */ "@/pages/NewOrderPage.vue")



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
  },
  {
	path: "/orders/:order_id",
	name: "OrderPage",
	component: orderPage,
  },
  {
	path: "/orders/new-order",
	name: "NewOrderPage",
	component: newOrderPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
