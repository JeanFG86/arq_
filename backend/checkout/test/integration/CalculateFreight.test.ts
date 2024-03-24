import ProductDataDatabase from "../../src/infra/data/ProductDataDatabase";
import CalculateFreight from "../../src/application/CalculateFreight";
import PgPromiseConnection from "../../src/infra/database/PgPromiseConnection";

describe("Calculate Freight", () => {
  it("Deve calcular o frete para um pedido", async () => {
    const connection = new PgPromiseConnection();
    const productData = new ProductDataDatabase(connection);
    const calculateFreight = new CalculateFreight(productData);
    const input = {
      items: [{ idProduct: 1, quantity: 1 }],
    };
    const output = await calculateFreight.execute(input);
    expect(output.total).toBe(30);
    await connection.close();
  });
});
