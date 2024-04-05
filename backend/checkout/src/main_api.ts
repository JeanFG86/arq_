import CouponDataDatabase from "./infra/data/CouponDataDatabase";
import OrderDataDatabase from "./infra/data/OrderDataDatabase";
import Checkout from "./application/Checkout";
import PgPromiseConnection from "./infra/database/PgPromiseConnection";
import ExpressHttpServer from "./infra/http/ExpressHttpServer";
import RestController from "./infra/controller/RestController";
import FreightGatewayHttp from "./infra/gateway/FreightGatewayHttp";
import CatalogGatewayHttp from "./infra/gateway/CatalogGatewayHttp";

const connection = new PgPromiseConnection();
const httpServer = new ExpressHttpServer();
const couponData = new CouponDataDatabase(connection);
const orderData = new OrderDataDatabase(connection);
const freightGateway = new FreightGatewayHttp();
const catalgoGateway = new CatalogGatewayHttp();
const checkout = new Checkout(catalgoGateway, couponData, orderData, freightGateway);
new RestController(httpServer, checkout);
httpServer.listen(3000);
