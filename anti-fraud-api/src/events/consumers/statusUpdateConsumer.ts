import { Kafka } from "kafkajs";
import { handleValidateTransactionStatus } from "./../../handler/TransactionHandler";
import config from "./../../../config/config";
import log from "npmlog";

const kafka = new Kafka({
  clientId: "transaction-api",
  brokers: [`${config.host}:${config.kafkaPort}`],
});

const consumer = kafka.consumer({ groupId: "transaction-group2" });

export const getTransactionCreatedEvent = async () => {
  await consumer.connect();
  await consumer.subscribe({
    topic: "transaction-created",
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      if (message.value) {
        const transaction = JSON.parse(message.value.toString());
        log.info("2. ","getTransactionCreatedEvent in anti-fraud-api");

        await handleValidateTransactionStatus(transaction);
      } else {
        log.error("Transaction", "No message in transaction");
      }
    },
  });
};
