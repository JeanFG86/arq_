import OrderData from "./OrderData";

export default class GetOrderByCpf {
  constructor(readonly orderData: OrderData) {}

  async execute(cpf: string): Promise<Output> {
    const order = await this.orderData.getByCpf(cpf);

    return {
      total: order.total,
    };
  }
}

type Output = {
  total: number;
};
