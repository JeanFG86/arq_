import Order from "../../domain/entities/Order";
import OrderData from "../../domain/data/OrderData";
import Connection from "../database/Connection";

export default class OrderDataDatabase implements OrderData {
  constructor(readonly connection: Connection) {}

  async save(order: Order): Promise<void> {
    await this.connection.query("insert into jg.order (cpf, total) values ($1, $2)", [
      order.cpf.getValue(),
      order.getTotal(),
    ]);
  }
  async getByCpf(cpf: string): Promise<any> {
    const [orderData] = await this.connection.query("select * from jg.order where cpf = $1", [cpf]);
    return orderData;
  }

  getAll(): Promise<Order[]> {
    throw new Error("Method not implemented.");
  }

  async count(): Promise<number> {
    const [options] = await this.connection.query("select count(*)::integer as count from jg.order", []);
    return options.count;
  }

  async clean(): Promise<void> {
    await this.connection.query("delete from cccat9.item", []);
    await this.connection.query("delete from cccat9.order", []);
  }
}
