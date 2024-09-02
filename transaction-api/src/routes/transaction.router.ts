import express from "express";
import log from "npmlog";
import { TransactionInterface } from "../model/transaction";
import { TransactionStatusEnum } from "../model/transactionStatusEnum";
import TransactionService from "../service/transaction.service";
import { sendTransactionCreatedEvent } from "./../events/producers/transactionProducer";

const transactionRouter = express.Router();

const transactionService = new TransactionService();

transactionRouter.post("/", async (req, res) => {
  try {
    const {
      accountExternalIdDebit,
      accountExternalIdCredit,
      transferType,
      value,
    } = req.body;
    const newTransaction = await transactionService.createTransaction({
      accountExternalIdDebit,
      accountExternalIdCredit,
      transferType,
      value,
      status: TransactionStatusEnum.PENDING,
      createdAt: new Date(),
    });

    await sendTransactionCreatedEvent(newTransaction as TransactionInterface);

    res
      .status(201)
      .json(transactionService.mapTransactionResponse(newTransaction as TransactionInterface));
  } catch (error) {
    log.error("error", error);
  }
});

transactionRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await transactionService.getTransactionById(id);
    res.status(201).json(transaction);
  } catch (error) {
    log.error("error", error);
  }
});

export default transactionRouter;
