import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { TransactionStatusEnum } from "./transactionStatusEnum";
import { TransferTypeModel } from "./transferType";

export interface TransactionInterface {
  id: string;
  accountExternalIdDebit: string;
  accountExternalIdCredit: string;
  transferType: TransferTypeModel;
  value: number;
  status: TransactionStatusEnum;
  createdAt: Date;
}

interface TransactionType {
  name: string;
}

interface TransactionStatus {
  name: string;
}

export interface TransactionResponse {
  transactionExternalId: string;
  transactionType: TransactionType;
  transactionStatus: TransactionStatus;
  value: number;
  createdAt: string;
}

@Entity("transactions")
export class TransactionModel implements TransactionInterface {
  @PrimaryGeneratedColumn("uuid")
  id: string = "";

  @Column()
  accountExternalIdDebit: string = "";

  @Column()
  accountExternalIdCredit: string = "";

  @ManyToOne(
    () => TransferTypeModel,
    (transferType) => transferType.transactions
  )
  @JoinColumn({
    name: "transfer_type_id",
    foreignKeyConstraintName: "transactions_transfer_type_fk",
    referencedColumnName: "id",
  })
  transferType!: TransferTypeModel;

  @Column()
  value: number = 0;

  @Column({
    type: "enum",
    enum: TransactionStatusEnum,
    default: TransactionStatusEnum.PENDING,
  })
  status: TransactionStatusEnum = TransactionStatusEnum.PENDING;

  @CreateDateColumn({
    name: "created_at",
  })
  createdAt: Date = new Date();
}
