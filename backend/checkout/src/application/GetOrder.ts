import OrderData from "../domain/data/OrderData";
import ProductData from "../domain/data/ProductData";
import CatalogGateway from "../infra/gateway/CatalogGateway";

export default class GetOrder {
  constructor(readonly orderData: OrderData, catalogGateway: CatalogGateway, readonly productData: ProductData) {}

  async execute(): Promise<Output> {
    const output: Output = [];
    const orders = await this.orderData.getAll();
    for (const order of orders) {
      const orderOutput: any = { code: order.getOrderCode(), total: order.getTotal(), items: [] };
      output.push(orderOutput);
      for (const item of order.items) {
        const product = await this.productData.getProduct(item.idProduct);
        orderOutput.items.push({
          idProduct: item.idProduct,
          description: product.description,
          price: item.price,
          quantity: item.quantity,
        });
      }
    }
    return output;
  }
}

type Output = {
  code: string;
  total: number;
  items: { idProduct: number; description: string; price: number; quantity: number };
}[];
