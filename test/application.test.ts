import { checkout } from "../src/Checkout";

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
    const output = await checkout(input);
    expect(output.total).toBe(6350);
  });
});
