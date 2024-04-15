import StockEntry from "../../domain/entities/StockEntry";
import StockEntryRepository from "../../domain/repository/StockEntryRepository";
import Connection from "../database/Connection";

export default class StockEntryRepositoryDatabase implements StockEntryRepository {
  constructor(readonly connection: Connection) {}
  save(stockEntry: StockEntry): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async getByIdProduct(idProduct: number): Promise<StockEntry[]> {
    const stockEntriesData = await this.connection.query("select * from jg.stock_entry where id_product = $1", [
      idProduct,
    ]);
    const stockEntries: StockEntry[] = [];
    for (const stockEntryData of stockEntriesData) {
      stockEntries.push(new StockEntry(stockEntryData.id_product, stockEntryData.operation, stockEntryData.quantity));
    }
    return stockEntries;
  }
  clean(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
