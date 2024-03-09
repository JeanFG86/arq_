import Order from "./Order";
import OrderData from "./OrderData";
import pgp from "pg-promise";

export default class OrderDataDatabase implements OrderData {
  async save(order: Order): Promise<void> {
    const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
    await connection.query("insert into jg.order (cpf, total) values ($1, $2)", [
      order.cpf.getValue(),
      order.getTotal(),
    ]);
    await connection.$pool.end();
  }
  async getByCpf(cpf: string): Promise<any> {
    const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
    const [orderData] = await connection.query("select * from jg.order where cpf = $1", [cpf]);
    await connection.$pool.end();
    return orderData;
  }

  async count(): Promise<number> {
    const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
    const [options] = await connection.query("select count(*)::integer as count from jg.order", []);
    await connection.$pool.end();
    return options.count;
  }
}
