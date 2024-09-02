import log from "npmlog";
import typeOrm from "../libs/datasource-typeOrm";
import {
  TransactionInterface,
  TransactionModel,
  TransactionResponse,
} from "../model/transaction";
import TransferTypeService from "./transferType.service";

const transactionRepository = typeOrm.getRepository(TransactionModel);
const transferTypeService = new TransferTypeService();

class TransactionService {
  async createTransaction(data: Partial<TransactionInterface>) {
    try {
      let transferType = null;
      if (data.transferType) {
        transferType = await transferTypeService.findById(data.transferType.id);
      } else {
        throw new Error("Invalid Transfer type");
      }

      if (!transferType) {
        throw new Error("Invalid Transfer type");
      }
      const newTransaction = await transactionRepository.save(data);
      newTransaction.transferType = transferType;
      return newTransaction;
    } catch (error) {
      log.error("Error creating transaction: ", error);
    }
  }

  async updateTransaction(data: TransactionInterface) {
    try {
      const existingTransaction = await transactionRepository.findOneBy({
        id: data.id,
      });

      if (existingTransaction) {
        existingTransaction.status = data.status;
        await transactionRepository.save(existingTransaction);
      } else {
        throw new Error("Transaction no exist");
      }
    } catch (error) {
      log.error("Error updating transaction", error);
    }
  }

  async getTransactionById(id: string) {
    try {
      const transaction = await transactionRepository.findOne({
        where: { id },
        relations: ["transferType"],
      });
      if (transaction) {
        return this.mapTransactionResponse(transaction);
      }
      throw new Error("Transaction no exist");
    } catch (error) {
      log.error(`Error retrieving transaction ${id}:`, error);
    }
  }

  mapTransactionResponse(transaction: TransactionInterface) {
    const transactionResponse: TransactionResponse = {
      transactionExternalId: transaction.id,
      transactionType: {
        name: transaction.transferType.name,
      },
      transactionStatus: {
        name: transaction.status,
      },
      value: transaction.value,
      createdAt: transaction.createdAt.toISOString(),
    };
    return transactionResponse;
  }
}

export default TransactionService;
