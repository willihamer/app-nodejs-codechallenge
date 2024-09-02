import { Kafka } from "kafkajs";
import { Transaction } from "../../model/Transaction";
import config from "./../../../config/config";
import log from "npmlog";

const kafka = new Kafka({
  clientId: "antifraud-transaction",
  brokers: [`${config.host}:${config.kafkaPort}`],
});

const producer = kafka.producer();

export const sendUpdateTransactionStatusEvent = async (
  transaction: Transaction
) => {
  await producer.connect();
  log.info("4. ", "sendUpdateTransactionStatusEvent from anti-fraud-api");

  await producer.send({
    topic: "transaction-status-updated",
    messages: [{ key: transaction.id, value: JSON.stringify(transaction) }],
  });
  await producer.disconnect();
};
