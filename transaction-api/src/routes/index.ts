import express, { Express } from "express";
import transactionRouter from "./transaction.router";
import transferTypeRouter from "./transferType.router";

const RouterApi = (app: Express) => {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/transactions", transactionRouter);
  router.use("/transfer-type", transferTypeRouter);
};

export default RouterApi;
