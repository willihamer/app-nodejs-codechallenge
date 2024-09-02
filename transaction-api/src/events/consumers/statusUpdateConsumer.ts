import { Kafka } from "kafkajs";
import config from "../../../config/config";
import log from "console";
import TransactionService from "./../../service/transaction.service";

const kafka = new Kafka({
  clientId: "transaction-api",
  brokers: [`${config.host}:${config.kafkaPort}`],
});

const consumer = kafka.consumer({ groupId: "transaction-group1" });
const transactionService = new TransactionService();

export const getUpdateTransactionStatusEvent = async () => {
  await consumer.connect();
  await consumer.subscribe({
    topic: "transaction-status-updated",
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      if (message.value) {
        const transaction = JSON.parse(message.value.toString());
        await transactionService.updateTransaction(transaction);
        log.info("5. ", "getUpdateTransactionStatusEvent in transaction-api");
      } else {
        log.error("Transaction", "No message in transaction");
      }
    },
  });
};
