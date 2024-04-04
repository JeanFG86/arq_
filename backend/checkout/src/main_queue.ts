import Checkout from "./application/Checkout";
import CouponDataDatabase from "./infra/data/CouponDataDatabase";
import ProductDataDatabase from "./infra/data/ProductDataDatabase";
import OrderDataDatabase from "./infra/data/OrderDataDatabase";
import PgPromiseConnection from "./infra/database/PgPromiseConnection";
import QueueController from "./infra/queue/QueueController";
import RabbitMQAdapter from "./infra/queue/RabbitMQAdapter";
import FreightGatewayHttp from "./infra/gateway/FreightGatewayHttp";

async function init() {
  const queue = new RabbitMQAdapter();
  await queue.connect();
  const connection = new PgPromiseConnection();
  const productData = new ProductDataDatabase(connection);
  const couponData = new CouponDataDatabase(connection);
  const orderData = new OrderDataDatabase(connection);
  const freightGateway = new FreightGatewayHttp();
  const checkout = new Checkout(productData, couponData, orderData, freightGateway);
  new QueueController(queue, checkout);
}
init();
