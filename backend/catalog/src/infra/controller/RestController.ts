import ProductData from "../../domain/data/ProductData";
import HttpServer from "../http/HttpServer";

export default class RestController {
  constructor(readonly httpServer: HttpServer, readonly productData: ProductData) {
    httpServer.on("get", "/products", async function (params: any, body: any) {
      const output = await productData.getProducts();
      return output;
    });
  }
}
