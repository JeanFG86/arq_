import Coupon from "./Coupon";
import CouponData from "./CouponData";
import pgp from "pg-promise";

export default class CouponDataDatabase implements CouponData {
  async getCoupon(code: string): Promise<Coupon> {
    const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
    const [couponData] = await connection.query("select * from jg.coupon where code = $1", [code]);
    await connection.$pool.end();
    if (!couponData) throw new Error("Coupon not found");
    return new Coupon(couponData.code, parseFloat(couponData.percentage), couponData.expire_date);
  }
}
