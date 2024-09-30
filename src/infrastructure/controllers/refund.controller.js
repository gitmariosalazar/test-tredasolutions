import { changeStatusRefund, createRefund, findRefundById } from "../../application/services/refunds/refunds.services.js";


export async function createRefundController(req, res) {
  const { return_id } = req.params;
 try {
   const it = await createRefund(return_id, req.body);
   res.send(it);
 } catch (error) {
  return res.status(500).json({ message: error.message });
 }
}


export async function updateStatus(req, res) {
  const { return_id, status } = req.params;
  try {
    const ret = await changeStatusRefund(return_id, { status: status });
    res.send(ret);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function findReturnOne(req, res) {
  const { refund_id } = req.params;
  try {
    const ret = await findRefundById(refund_id);
    res.send(ret);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}