import Order from "../src/Order";
import Product from "../src/Product";

describe("Order test", () => {
  it("Deve criar um pedido vazio com CPF válido", () => {
    const order = new Order("987.654.321-00");
    expect(order.getTotal()).toBe(0);
  });

  it("Não deve criar um pedido com CPF inválido", () => {
    expect(() => new Order("111.111.111-11")).toThrow("Invalid cpf");
  });

  it("Deve criar um pedido com 3 itens", () => {
    const order = new Order("987.654.321-00");
    order.addItem(new Product(1, "A", 1000, 100, 30, 10, 3), 1);
    order.addItem(new Product(2, "B", 5000, 50, 50, 50, 22), 1);
    order.addItem(new Product(3, "C", 30, 10, 10, 10, 1), 3);
    expect(order.getTotal()).toBe(6090);
  });
});
