import FreightCalculator from "../src/domain/entities/FreightCalculator";

describe("Freight Calculator test", () => {
  it("Deve calcular o frete", () => {
    const product = {
      width: 100,
      height: 30,
      length: 10,
      weight: 3,
    };
    const freight = FreightCalculator.calculate(product);
    expect(freight).toBe(30);
  });

  it("Deve calcular o mínimo", () => {
    const product = {
      width: 10,
      height: 10,
      length: 10,
      weight: 0.9,
    };
    const freight = FreightCalculator.calculate(product);
    expect(freight).toBe(10);
  });
});
