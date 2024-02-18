import amqp from "amqplib";

async function init() {
  const connectionQueue = await amqp.connect("amqp://localhost");
  const channel = await connectionQueue.createChannel();
  await channel.assertQueue("checkout", { durable: true });
  await channel.consume("checkout", async function (msg: any) {
    channel.ack(msg.content.toString());
  });
}

init();
