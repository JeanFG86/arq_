import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import CheckoutGatewayHttp from "./infra/gateway/CheckoutGatewayHttp";
import AxiosAdapter from "./infra/http/AxiosAdapter";

const app = createApp(App);
const httpClient = new AxiosAdapter();
const baseUrl = "http://localhost:3000";
const checkoutGateway = new CheckoutGatewayHttp(httpClient, baseUrl);
app.provide("checkoutGateway", checkoutGateway);
app.mount("#app");
