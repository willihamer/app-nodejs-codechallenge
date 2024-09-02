import express from "express";
import log from "npmlog";
import RouterApi from "./src/routes";
import config from "./config/config";
import { getUpdateTransactionStatusEvent } from "./src/events/consumers/statusUpdateConsumer";

const app = express();
const port = config.port;

app.use(express.json());
RouterApi(app);

const startServer = async () => {
  try {
    await getUpdateTransactionStatusEvent();
    app.listen(port, () => {
      log.info(
        "Server Started",
        `transaction-api listening at http://localhost:${port}`
      );
    });
  } catch (error) {
    log.error("Error starting server:", error);
  }
};

startServer();
