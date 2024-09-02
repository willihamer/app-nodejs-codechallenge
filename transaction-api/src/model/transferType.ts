import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { TransactionModel } from "./transaction";

export interface TransferTypeInterface {
  id: number;
  name: string;
}

@Entity("transfer_types")
export class TransferTypeModel implements TransferTypeInterface {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  name: string = "";

  @OneToMany(() => TransactionModel, (transaction) => transaction.transferType)
  transactions!: TransactionModel[];
}
