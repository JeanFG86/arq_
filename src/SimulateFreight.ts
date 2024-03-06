import ProductData from "./ProductData";

export default class SimulateFreight {
  constructor(readonly productData: ProductData) {}

  async execute(input: Input): Promise<Output> {
    let total = 0;
    for (const item of input.items) {
      const product = await this.productData.getProduct(item.idProduct);
      if (product) {
        const volume =
          (product.width / 100) *
          (product.height / 100) *
          (product.length / 100);
        const density = parseFloat(product.weight) / volume;
        const itemFreight = 1000 * volume * (density / 100);
        total += itemFreight >= 10 ? itemFreight : 10;
      } else {
        throw new Error("Product not found");
      }
    }
    return {
      total,
    };
  }
}

type Input = {
  items: { idProduct: number; quantity: number }[];
};

type Output = {
  total: number;
};
