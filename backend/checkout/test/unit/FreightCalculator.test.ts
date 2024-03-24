import FreightCalculator from "../../src/domain/entities/FreightCalculator";
import Product from "../../src/domain/entities/Product";

describe("Freight Calculator test", () => {
  it("Deve calcular o frete com distancia padrao", () => {
    const product = new Product(1, "A", 1000, 100, 30, 10, 3);
    const freight = FreightCalculator.calculate(product);
    expect(freight).toBe(30);
  });

  it("Deve calcular o frete com distancia variável", () => {
    const product = new Product(1, "A", 1000, 100, 30, 10, 3);
    const distance = 748.2217780081631;
    const freight = FreightCalculator.calculate(product, distance);
    expect(freight).toBe(22.45);
  });

  it("Deve calcular o mínimo", () => {
    const product = new Product(1, "A", 1000, 10, 10, 10, 0.9);
    const freight = FreightCalculator.calculate(product);
    expect(freight).toBe(10);
  });
});
