import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import './main.css'

// ElementPlus
// import ElementPlus from 'element-plus';
import {
    Table, Popconfirm, Button, Pagination, Dropdown,
    Menu, Select, Input
} from "ant-design-vue"
// import 'element-plus/dist/index.css';
import "ant-design-vue/dist/antd.css";

import { Icon } from '@iconify/vue';
import PageTitle from '@/components/text/PageTitle.vue';
import StageTitle from '@/components/text/StageTitle.vue';

// maska 
import Maska from 'maska';


const app = createApp(App)

app.use(Table)
app.use(Popconfirm)
app.use(Button)
app.use(Pagination)
app.use(Dropdown)
app.use(Menu)
app.use(Select)
app.use(Input)

app.use(store)
app.use(router)
// app.use(ElementPlus)
app.use(Maska)


// app global components
app.component('Icon', Icon)
app.component('PageTitle', PageTitle)
app.component('StageTitle', StageTitle)


app.mount("#app");
