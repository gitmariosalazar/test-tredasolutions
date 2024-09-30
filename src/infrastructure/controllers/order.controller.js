import { createOrder, findAllOrders, findOrderById } from "../../application/services/orders/orders.services.js";


export async function createOrderController(req, res) {
  const items = req.body
  console.log("Items seleccionados", items.length)
 try {
   const { customer } = req.params;
   const it = await createOrder(items, customer);
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

export async function getOrderOne(req,res) {
  const { order_id } = req.params;
  try {
    const order = await findOrderById(order_id);
    res.send(order)
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}