import { TransactionStatusEnum } from "./TransactionStatusEnum";

export interface Transaction {
  id: string;
  accountExternalIdDebit: string;
  accountExternalIdCredit: string;
  transferType: number;
  value: number;
  status: TransactionStatusEnum;
  createdAt: Date;
}