import CouponData from "./CouponData";

export default class ValidateCoupon {
  constructor(readonly couponData: CouponData) {}

  async execute(code: string, total: number): Promise<Output> {
    const coupon = await this.couponData.getCoupon(code);
    const today = new Date();
    let isExpired = true;
    let discount = 0;
    if (coupon && coupon.expire_date.getTime() > today.getTime()) {
      discount = (total * coupon.percentage) / 100;
      isExpired = false;
    }
    return {
      isExpired,
      discount,
    };
  }
}

type Output = {
  isExpired: boolean;
  discount: number;
};
