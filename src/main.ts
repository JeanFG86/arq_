import express from "express";
import { validate } from "./CpfValidator";
import pgp from "pg-promise";
const app = express();
app.use(express.json());

const connection = pgp()("postgres://postgres:123456@localhost:5432/app");

app.post("/checkout", async function (req, res) {
  const isValid = validate(req.body.cpf);
  if (!isValid) {
    return res.status(422).json({
      message: "Invalid cpf",
    });
  }
  let total = 0;
  const productsIds: number[] = [];
  for (const item of req.body.items) {
    if (productsIds.some((idProduct) => idProduct === item.idProduct)) {
      return res.status(422).json({
        message: "Duplicated product",
      });
    }
    productsIds.push(item.idProduct);
    const [product] = await connection.query(
      "select * from jg.product where id_product = $1",
      [item.idProduct]
    );
    if (product) {
      if (item.quantity <= 0) {
        return res.status(422).json({
          message: "Quantity must be positive",
        });
      }
      total += parseFloat(product.price) * item.quantity;
    } else {
      return res.status(422).json({
        message: "Product not found",
      });
    }
  }
  if (req.body.coupon) {
    const [coupon] = await connection.query(
      "select * from jg.coupon where code = $1",
      [req.body.coupon]
    );
    const today = new Date();
    if (coupon && coupon.expire_date.getTime() > today.getTime()) {
      total -= (total * coupon.percentage) / 100;
    }
  }
  res.json({
    total,
  });
});
app.listen(3000);
