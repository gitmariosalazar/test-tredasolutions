import { createOrder, findAllOrders } from "../../application/services/orders/orders.services.js";
import { changeStatus, createReturns, findReturnById } from "../../application/services/returns/returns.services.js";


export async function createReturnController(req, res) {
  const { order_item } = req.params;
  try {
    const it = await createReturns(order_item, req.body);
    res.send(it);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function getOrders(req, res) {
  try {
    const orders = await findAllOrders();
    res.send(orders);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}


export async function updateStatus(req, res) {
  const { return_id, status } = req.params;
  try {
  const ret = await changeStatus(return_id, { status: status });
  res.send(ret)
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function findReturnOne(req, res) {
  const { return_id } = req.params;
  try {
    const ret = await findReturnById(return_id);
    res.send(ret)
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}