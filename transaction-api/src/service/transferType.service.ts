import log from "npmlog";
import { typeOrm } from "./../libs/datasource-typeOrm";
import {
  TransferTypeInterface,
  TransferTypeModel,
} from "./../model/transferType";

const transferTypeRepository = typeOrm.getRepository(TransferTypeModel);

class TransferTypeService {
  async createTransferTypes(data: Partial<TransferTypeInterface>) {
    try {
      const newTransferType = await transferTypeRepository.save(data);
      return newTransferType;
    } catch (error) {
      log.error("Error creating TransferType: ", error);
    }
  }

  async findById(id: number) {
    try {
      return await transferTypeRepository.findOneBy({ id });
    } catch (error) {
      log.error("Error fetching TransferType: ", error);
    }
  }
}

export default TransferTypeService;
