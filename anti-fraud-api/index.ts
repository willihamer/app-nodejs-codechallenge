import express from "express";
import log from "npmlog";
import config from "./config/config";
import { getTransactionCreatedEvent } from "./src/events/consumers/statusUpdateConsumer";

const app = express();
const port = config.port;

app.get("/", (req, res) => {
  res.send("Hello Hamer!");
});

const startServer = async () => {
  try {
    await getTransactionCreatedEvent();
    app.listen(port, () => {
      log.info(
        "Server Started",
        `anti-fraud-api listening at http://localhost:${port}`
      );
    });
  } catch (error) {
    log.error("Error starting server:", error);
  }
};

startServer();
