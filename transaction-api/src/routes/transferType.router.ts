import express from "express";
import TransferTypeService from "../service/transferType.service";
import log from "npmlog";

const transferTypeRouter = express.Router();

const transferTypeService = new TransferTypeService();

transferTypeRouter.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const newTransferType = await transferTypeService.createTransferTypes({
      name,
    });
    res.status(201).json(newTransferType);
  } catch (error) {
    log.error("error", error);
  }
});

export default transferTypeRouter;
