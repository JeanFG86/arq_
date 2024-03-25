import CouponData from "../domain/data/CouponData";
import CurrencyGatewayRandom from "../infra/gateway/CurrencyGatewayRandom";
import CurrencyGateway from "../infra/gateway/CurrencyGeteway";
import Mailer from "../infra/mailer/Mailer";
import MailerConsole from "../infra/mailer/MailerConsole";
import Order from "../domain/entities/Order";
import OrderData from "../domain/data/OrderData";
import ProductData from "../domain/data/ProductData";
import FreightCalculator from "../domain/entities/FreightCalculator";
import ZipcodeData from "../domain/data/ZipcodeData";
import DistanceCalculator from "../domain/entities/DistanceCalculator";

export default class Checkout {
  constructor(
    readonly productData: ProductData,
    readonly couponData: CouponData,
    readonly orderData: OrderData,
    readonly zipcodeData: ZipcodeData,
    readonly currencyGateway: CurrencyGateway = new CurrencyGatewayRandom(),
    readonly mailer: Mailer = new MailerConsole()
  ) {}

  async execute(input: Input) {
    let distance;
    if (input.from && input.to) {
      const from = await this.zipcodeData.get(input.from);
      const to = await this.zipcodeData.get(input.to);
      if (from && to) {
        distance = DistanceCalculator.calculate(from.coord, to.coord);
      }
    }
    const currencies = await this.currencyGateway.getCurrencies();
    const order = new Order(input.cpf);
    for (const item of input.items) {
      const product = await this.productData.getProduct(item.idProduct);
      order.addItem(product, item.quantity, product.currency, currencies.getCurrency(product.currency));
      order.freight += FreightCalculator.calculate(product, distance) * item.quantity;
    }
    if (input.coupon) {
      const coupon = await this.couponData.getCoupon(input.coupon);
      order.addCoupon(coupon);
    }
    await this.orderData.save(order);
    return { code: order.getOrderCode(), total: order.getTotal() };
  }
}

type Input = {
  from?: string;
  to?: string;
  cpf: string;
  email?: string;
  items: { idProduct: number; quantity: number }[];
  coupon?: string;
};
