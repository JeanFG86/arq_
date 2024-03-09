import Product from "./Product";
import ProductData from "./ProductData";
import pgp from "pg-promise";

export default class ProductDataDatabase implements ProductData {
  async getProduct(idProduct: number): Promise<Product> {
    const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
    const [productData] = await connection.query("select * from jg.product where id_product = $1", [idProduct]);
    await connection.$pool.end();
    if (!productData) throw new Error("Product not found");
    return new Product(
      productData.id_product,
      productData.description,
      parseFloat(productData.price),
      productData.width,
      productData.height,
      productData.length,
      productData.weight
    );
  }
}
