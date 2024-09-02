import { sendUpdateTransactionStatusEvent } from "../events/producers/statusUpdateProducer";
import { Transaction } from "../model/Transaction";
import log from "npmlog";
import { TransactionStatusEnum } from "../model/TransactionStatusEnum";

export const handleValidateTransactionStatus = async (
  transaction: Transaction
) => {
  const status = transaction.value > 1000 ? TransactionStatusEnum.REJECTED : TransactionStatusEnum.APPROVED;
  transaction.status = status;
  log.info("3.","handleValidateTransactionStatus in anti-fraud-api");
  await sendUpdateTransactionStatusEvent(transaction);

  log.info(
    "Transaction updated",
    `Transaction ${transaction.id} processed and marked as ${status}`
  );
};
