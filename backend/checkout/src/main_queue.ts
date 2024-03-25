import Checkout from "./application/Checkout";
import CouponDataDatabase from "./infra/data/CouponDataDatabase";
import ProductDataDatabase from "./infra/data/ProductDataDatabase";
import OrderDataDatabase from "./infra/data/OrderDataDatabase";
import PgPromiseConnection from "./infra/database/PgPromiseConnection";
import QueueController from "./infra/queue/QueueController";
import RabbitMQAdapter from "./infra/queue/RabbitMQAdapter";
import ZipcodeDataDatabase from "./infra/data/ZipcodeDataDatabase";

async function init() {
  const queue = new RabbitMQAdapter();
  await queue.connect();
  const connection = new PgPromiseConnection();
  const productData = new ProductDataDatabase(connection);
  const couponData = new CouponDataDatabase(connection);
  const orderData = new OrderDataDatabase(connection);
  const zipcodeData = new ZipcodeDataDatabase(connection);
  const checkout = new Checkout(productData, couponData, orderData, zipcodeData);
  new QueueController(queue, checkout);
}
init();
