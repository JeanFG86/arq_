import Coupon from "./Coupon";
import Cpf from "./Cpf";
import Item from "./Item";
import Product from "./Product";

export default class Order {
  cpf: Cpf;
  items: Item[];
  coupon?: Coupon;

  constructor(cpf: string) {
    this.cpf = new Cpf(cpf);
    this.items = [];
  }

  addItem(product: Product, quantity: number) {
    this.items.push(new Item(product.idProduct, product.price, quantity));
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
    return total;
  }
}
