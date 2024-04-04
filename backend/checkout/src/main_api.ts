import ProductDataDatabase from "./infra/data/ProductDataDatabase";
import CouponDataDatabase from "./infra/data/CouponDataDatabase";
import OrderDataDatabase from "./infra/data/OrderDataDatabase";
import Checkout from "./application/Checkout";
import PgPromiseConnection from "./infra/database/PgPromiseConnection";
import ExpressHttpServer from "./infra/http/ExpressHttpServer";
import RestController from "./infra/controller/RestController";
import FreightGatewayHttp from "./infra/gateway/FreightGatewayHttp";

const connection = new PgPromiseConnection();
const httpServer = new ExpressHttpServer();
const productData = new ProductDataDatabase(connection);
const couponData = new CouponDataDatabase(connection);
const orderData = new OrderDataDatabase(connection);
const freightGateway = new FreightGatewayHttp();
const checkout = new Checkout(productData, couponData, orderData, freightGateway);
new RestController(httpServer, checkout);
httpServer.listen(3000);
