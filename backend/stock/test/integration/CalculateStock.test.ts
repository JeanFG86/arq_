import CalculateStock from "../../src/application/CalculateStock";
import PgPromiseConnection from "../../src/infra/database/PgPromiseConnection";
import StockEntryRepositoryDatabase from "../../src/infra/repository/StockEntryRepositoryDatabase";

describe("", () => {
  it("Deve calcular o estoque de um produto", async function () {
    const connection = new PgPromiseConnection();
    const stockEntryRepository = new StockEntryRepositoryDatabase(connection);
    const calculateStock = new CalculateStock(stockEntryRepository);
    const idProduct = 1;
    const output = await calculateStock.execute(idProduct);
    expect(output.total).toBe(0);
    await connection.close();
  });
});
