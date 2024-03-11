import Coupon from "../src/domain/entities/Coupon";

describe("Coupon test", () => {
  it("Deve testar o cupon", async () => {
    const coupon = new Coupon("VALE20", 20, new Date("2024-03-30T10:00:00:00"));
    expect(coupon.isExpired()).toBeFalsy();
    expect(coupon.getDiscount(1000)).toBe(200);
  });
});
