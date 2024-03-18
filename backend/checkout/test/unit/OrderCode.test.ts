import OrderCode from "../../src/domain/entities/OrderCode";

describe("Order code Test", () => {
  it("Deve criar um código para o pedido", () => {
    const orderCode = new OrderCode(new Date("2024-03-08T10:00:00"), 1);
    expect(orderCode.getValue()).toBe("202400000001");
  });

  it("Não deve criar um código para o pedido se a sequence for negativa", () => {
    expect(() => new OrderCode(new Date("2024-03-08T10:00:00"), -1)).toThrow(new Error("Invalid sequence"));
  });
});
