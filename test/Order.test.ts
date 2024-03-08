import Order from "../src/Order";

describe("Order test", () => {
  it("Deve criar um pedido vazio com CPF válido", () => {
    const order = new Order("987.654.321-00");
    expect(order.getTotal()).toBe(0);
  });

  it("Não deve criar um pedido com CPF inválido", () => {
    expect(() => new Order("111.111.111-11")).toThrow("Invalid cpf");
  });
});
