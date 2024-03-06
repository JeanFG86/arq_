import CouponDataDatabase from "../src/CouponDataDatabase";
import ValidateCoupon from "../src/ValidateCoupon";

describe("Validate coupon", () => {
  it("Deve validar um cupon de desconto", async () => {
    const couponData = new CouponDataDatabase();
    const validateCoupon = new ValidateCoupon(couponData);
    const output = await validateCoupon.execute("VALE20", 1000);
    expect(output.isExpired).toBeFalsy();
    expect(output.discount).toBe(200);
  });
});
