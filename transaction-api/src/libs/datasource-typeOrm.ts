import config from "../../config/config";
import { DataSource } from "typeorm";
import log from "npmlog";
import { TransactionModel } from "../model/transaction";
import { TransferTypeModel } from "../model/transferType";

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);

export const typeOrm = new DataSource({
  type: "postgres",
  host: config.dbHost,
  port: parseInt(config.dbPort),
  username: USER,
  password: PASSWORD,
  database: config.dbName,
  logging: false,
  entities: [TransactionModel, TransferTypeModel],
  synchronize: true,
});

typeOrm
  .initialize()
  .then(() => {})
  .catch((error) => log.error("Error Starting database", error.message));

export default typeOrm;
