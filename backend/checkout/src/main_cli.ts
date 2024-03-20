import Checkout from "./application/Checkout";
import CLIController from "./infra/cli/CLIController";
import CLIHandlerNode from "./infra/cli/CLIHandlerNode";
import CouponDataDatabase from "./infra/data/CouponDataDatabase";
import OrderDataDatabase from "./infra/data/OrderDataDatabase";
import ProductDataDatabase from "./infra/data/ProductDataDatabase";
import PgPromiseConnection from "./infra/database/PgPromiseConnection";

const connection = new PgPromiseConnection();
const productData = new ProductDataDatabase(connection);
const couponData = new CouponDataDatabase(connection);
const orderData = new OrderDataDatabase(connection);
const checkout = new Checkout(productData, couponData, orderData);
const handler = new CLIHandlerNode();
new CLIController(handler, checkout);
handler.type("set-cpf 111.111.111-11");
handler.type("add-item 1 1");
handler.type("checkout");