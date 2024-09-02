import { Kafka } from "kafkajs";
import { TransactionInterface } from "../../model/transaction";
import config from "./../../../config/config";
import log from "npmlog";

const kafka = new Kafka({
  clientId: "transaction-api",
  brokers: [`${config.host}:${config.kafkaPort}`],
});

const producer = kafka.producer();

export const sendTransactionCreatedEvent = async (transaction: TransactionInterface) => {
  await producer.connect();
  await producer.send({
    topic: "transaction-created",
    messages: [{ key: transaction.id, value: JSON.stringify(transaction) }],
  });
  log.info("1. ", "sendTransactionCreatedEvent from transaction-api");
  await producer.disconnect();
};
