import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import './main.css'

// ElementPlus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import { Icon } from '@iconify/vue';
import PageTitle from '@/components/text/PageTitle.vue';


const app = createApp(App)

app.use(store)
app.use(router)
app.use(ElementPlus)

// app global components
app.component('Icon', Icon)
app.component('PageTitle', PageTitle)


app.mount("#app");
