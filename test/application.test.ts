import Checkout from "../src/Checkout";
import CouponDataDatabase from "../src/CouponDataDatabase";
import ProductDataDatabase from "../src/ProductDataDatabase";

describe("", () => {
  test("Deve fazer um pedido com 3 produtos", async function () {
    const input = {
      cpf: "987.654.321-00",
      items: [
        { idProduct: 1, quantity: 1 },
        { idProduct: 2, quantity: 1 },
        { idProduct: 3, quantity: 3 },
      ],
    };
    const productData = new ProductDataDatabase();
    const couponData = new CouponDataDatabase();
    const checkout = new Checkout(productData, couponData);
    const output = await checkout.execute(input);
    expect(output.total).toBe(6350);
  });
});
