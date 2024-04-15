import FreightCalculator from "../../src/domain/entities/FreightCalculator";

describe("Freight Calculator test", () => {
  it("Deve calcular o frete com distancia padrao", () => {
    const freight = FreightCalculator.calculate(0.03, 100);
    expect(freight).toBe(30);
  });

  it("Deve calcular o frete com distancia padrao", () => {
    const freight = FreightCalculator.calculate(0.125, 176);
    expect(freight).toBe(220);
  });

  it("Deve calcular o frete com distancia variável", () => {
    const distance = 748.2217780081631;
    const freight = FreightCalculator.calculate(0.03, 100, distance);
    expect(freight).toBe(22.45);
  });

  it("Deve calcular o mínimo", () => {
    const freight = FreightCalculator.calculate(0.01, 100);
    expect(freight).toBe(10);
  });
});
