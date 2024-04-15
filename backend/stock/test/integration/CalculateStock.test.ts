import CalculateStock from "../../src/application/CalculateStock";
import IncreaseStock from "../../src/application/IncreaseStock";
import PgPromiseConnection from "../../src/infra/database/PgPromiseConnection";
import StockEntryRepositoryDatabase from "../../src/infra/repository/StockEntryRepositoryDatabase";

describe("", () => {
  it("Deve calcular o estoque de um produto sem disponibilidade", async function () {
    const connection = new PgPromiseConnection();
    const stockEntryRepository = new StockEntryRepositoryDatabase(connection);
    await stockEntryRepository.clean();
    const calculateStock = new CalculateStock(stockEntryRepository);
    const idProduct = 1;
    const output = await calculateStock.execute(idProduct);
    expect(output.total).toBe(0);
    await connection.close();
  });

  it("Deve calcular o estoque de um produto com disponibilidade", async function () {
    const connection = new PgPromiseConnection();
    const stockEntryRepository = new StockEntryRepositoryDatabase(connection);
    await stockEntryRepository.clean();
    const increaseStock = new IncreaseStock(stockEntryRepository);
    const input1 = {
      items: [{ idProduct: 1, quantity: 10 }],
    };
    await increaseStock.execute(input1);
    const calculateStock = new CalculateStock(stockEntryRepository);
    const idProduct = 1;
    const output = await calculateStock.execute(idProduct);
    expect(output.total).toBe(10);
    await connection.close();
  });
});
