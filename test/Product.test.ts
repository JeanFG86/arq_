import Product from "../src/domain/entities/Product";

describe("Product test", () => {
  it("Deve calcular o volume do produto", () => {
    const product = new Product(1, "A", 1000, 100, 30, 10, 3);
    expect(product.getVolume()).toBe(0.03);
  });

  it("Deve calcular a densidade do produto", () => {
    const product = new Product(1, "A", 1000, 100, 30, 10, 3);
    expect(product.getDensity()).toBe(100);
  });
});
