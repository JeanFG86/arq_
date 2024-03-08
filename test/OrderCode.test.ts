import OrderCode from "../src/OrderCode";

describe("Order code Test", () => {
  it("Deve criar um código para o pedido", () => {
    const orderCode = new OrderCode(new Date("2024-03-08T10:00:00"), 1);
    expect(orderCode.getValue()).toBe("202400000001");
  });
});
