import Coupon from "./Coupon";
import Cpf from "./Cpf";
import FreightCalculator from "./FreightCalculator";
import Item from "./Item";
import Product from "./Product";

export default class Order {
  cpf: Cpf;
  items: Item[];
  coupon?: Coupon;
  freight = 0;

  constructor(cpf: string) {
    this.cpf = new Cpf(cpf);
    this.items = [];
  }

  addItem(product: Product, quantity: number) {
    if (this.items.some((item) => item.idProduct === product.idProduct)) throw new Error("Duplicated product");
    this.items.push(new Item(product.idProduct, product.price, quantity));
    this.freight += FreightCalculator.calculate(product);
  }

  addCoupon(coupon: Coupon) {
    if (!coupon.isExpired()) {
      this.coupon = coupon;
    }
  }

  getTotal() {
    let total = 0;
    for (const item of this.items) {
      total += item.getTotal();
    }
    if (this.coupon) {
      total -= this.coupon?.getDiscount(total);
    }
    total += this.freight;
    return total;
  }
}
