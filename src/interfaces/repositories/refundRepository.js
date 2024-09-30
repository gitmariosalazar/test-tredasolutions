
import { refunds } from "../../infrastructure/database/models/Refunds.js";

class RefundRepository {
  async create(refundData) {
    const ret = await refunds.create(refundData);
    return ret;
  }
  async findRefundById(refund_id) {
    const ret = await refunds.findOne({
      where: {
        refund_id: refund_id,
      },
    });
    return ret;
  }

  async findAll() {
    return refunds.findAll();
  }

  async update(refund_id, refundData) {
    await refunds.update(refundData, {
      where: { refund_id: refund_id },
    });
    return this.findRefundById(refund_id);
  }

  async delete(refund_id) {
    const ref = await this.findRefundById(refund_id);
    if (ref) {
      await refunds.destroy({ where: { refund_id: refund_id } });
      return true;
    }
    return false;
  }
}

export default RefundRepository;
