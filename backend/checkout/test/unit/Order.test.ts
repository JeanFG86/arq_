import Coupon from "../../src/domain/entities/Coupon";
import Order from "../../src/domain/entities/Order";
import Product from "../../src/domain/entities/Product";

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
    order.freight = 260;
    expect(order.getTotal()).toBe(6350);
  });

  it("Deve criar um pedido com 3 itens com cupom de desconto", () => {
    const order = new Order("987.654.321-00");
    order.addItem(new Product(1, "A", 1000, 100, 30, 10, 3), 1);
    order.addItem(new Product(2, "B", 5000, 50, 50, 50, 22), 1);
    order.addItem(new Product(3, "C", 30, 10, 10, 10, 1), 3);
    order.addCoupon(new Coupon("VALE20", 20, new Date("2024-04-01T10:00:00")));
    order.freight = 260;
    expect(order.getTotal()).toBe(5132);
  });

  it("Não deve criar um pedido com itens com quantidade negativa", () => {
    const order = new Order("987.654.321-00");
    expect(() => order.addItem(new Product(1, "A", 1000, 100, 30, 10, 3), -1)).toThrow(
      new Error("Quantity must be positive")
    );
  });

  it("Não deve criar um pedido com item duplicado", () => {
    const order = new Order("987.654.321-00");
    order.addItem(new Product(1, "A", 1000, 100, 30, 10, 3), 1);
    expect(() => order.addItem(new Product(1, "A", 1000, 100, 30, 10, 3), 1)).toThrow(new Error("Duplicated product"));
  });

  it("Deve criar um pedido com 3 itens com código", () => {
    const order = new Order("987.654.321-00", new Date("2024-03-09T10:00:00"), 1);
    order.addItem(new Product(1, "A", 1000, 100, 30, 10, 3), 1);
    order.addItem(new Product(2, "B", 5000, 50, 50, 50, 22), 1);
    order.addItem(new Product(3, "C", 30, 10, 10, 10, 1), 3);
    expect(order.getOrderCode()).toBe("202400000001");
  });
});
