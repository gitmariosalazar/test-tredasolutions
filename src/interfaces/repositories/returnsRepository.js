
import { refunds } from "../../infrastructure/database/models/Refunds.js";
import { returns } from "../../infrastructure/database/models/Returns.js";

class ReturnRepository {
  async create(returnData) {
    const ret = await returns.create(returnData);
    return ret;
  }
  async findReturnByOrderId(order_id) {
    const ret = await returns.findOne({
      where: {
        order_id: order_id,
      },
    });
    return ret;
  }

  async findReturnById(return_id) {
    const ret = await returns.findOne({
      where: {
        return_id: return_id,
      },
      include: {
        model: refunds,
        as: "refund",
      },
    });
    return ret;
  }

  async findReturnByOrderItem(order_item) {
    const ret = await returns.findOne({
      where: {
        order_item: order_item,
      },
      include: {
        model: refunds,
        as: "refund",
      },
    });
    return ret;
  }

  async findAll() {
    return returns.findAll();
  }

  async update(return_id, returnData) {
    await returns.update(returnData, {
      where: { return_id: return_id },
    });
    return this.findReturnById(return_id);
  }

  async delete(return_id) {
    const ret = await this.findReturnById(return_id);
    if (ret) {
      await returns.destroy({ where: { return_id: return_id } });
      return true;
    }
    return false;
  }
}

export default ReturnRepository;
