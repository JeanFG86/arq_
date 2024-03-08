describe("Order test", () => {
  it("Deve criar um pedido", () => {
    const order = new Order("987.654.321-00");
    expect(order.getTotal()).toBe(0);
  });
});
