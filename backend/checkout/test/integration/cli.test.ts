import CalculateFreight from "../../src/application/CalculateFreight";
import Checkout from "../../src/application/Checkout";
import CLIController from "../../src/infra/cli/CLIController";
import CLIHandler from "../../src/infra/cli/CLIHandler";
import CLIHandlerMemory from "../../src/infra/cli/CLIHandlerMemory";
import CouponDataDatabase from "../../src/infra/data/CouponDataDatabase";
import OrderDataDatabase from "../../src/infra/data/OrderDataDatabase";
import ProductDataDatabase from "../../src/infra/data/ProductDataDatabase";
import ZipcodeDataDatabase from "../../src/infra/data/ZipcodeDataDatabase";
import PgPromiseConnection from "../../src/infra/database/PgPromiseConnection";
import sinon from "sinon";

describe("CLI test", () => {
  it("Deve testar o cli", async () => {
    const connection = new PgPromiseConnection();
    const productData = new ProductDataDatabase(connection);
    const couponData = new CouponDataDatabase(connection);
    const orderData = new OrderDataDatabase(connection);
    const zipcodeData = new ZipcodeDataDatabase(connection);
    const calculateFreight = new CalculateFreight(productData, zipcodeData);
    const checkout = new Checkout(productData, couponData, orderData, calculateFreight);
    const checkoutSpy = sinon.spy(checkout, "execute");
    const handler = new CLIHandlerMemory();
    new CLIController(handler, checkout);
    await handler.type("set-cpf 987.654.321-00");
    await handler.type("add-item 1 1");
    await handler.type("checkout");
    const [returnValue] = checkoutSpy.returnValues;
    const output = await returnValue;
    expect(output.code).toBe("202400000001");
    expect(output.total).toBe(1030);
    checkoutSpy.restore();
  });
});
