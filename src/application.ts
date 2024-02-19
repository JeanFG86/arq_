import { validate } from "./CpfValidator";
import pgp from "pg-promise";

export async function checout(input: Input) {
  const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
  const isValid = validate(input.cpf);
  if (!isValid) {
    throw new Error("Invalid cpf");
  }
  let total = 0;
  let freight = 0;
  const productsIds: number[] = [];
  for (const item of input.items) {
    if (productsIds.some((idProduct) => idProduct === item.idProduct)) {
      throw new Error("Duplicated product");
    }
    productsIds.push(item.idProduct);
    const [product] = await connection.query(
      "select * from jg.product where id_product = $1",
      [item.idProduct]
    );
    if (product) {
      if (item.quantity <= 0) {
        throw new Error("Quantity must be positive");
      }
      total += parseFloat(product.price) * item.quantity;
      const volume =
        (product.width / 100) * (product.height / 100) * (product.length / 100);
      const density = parseFloat(product.weight) / volume;
      const itemFreight = 1000 * volume * (density / 100);
      freight += itemFreight >= 10 ? itemFreight : 10;
    } else {
      throw new Error("Product not found");
    }
  }
  if (input.coupon) {
    const [coupon] = await connection.query(
      "select * from jg.coupon where code = $1",
      [input.coupon]
    );
    const today = new Date();
    if (coupon && coupon.expire_date.getTime() > today.getTime()) {
      total -= (total * coupon.percentage) / 100;
    }
  }
  total += freight;
  return { total };
}

// prettier-ignore
type Input = {
  cpf: string;
  items: { idProduct: number; quantity: number }[];
  coupon?: string;
};
