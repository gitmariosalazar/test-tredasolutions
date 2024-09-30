import Refund from "../../../domain/entities/refund.entitie.js";
import OrderItemsRepository from "../../../interfaces/repositories/orderItemsRepository.js";
import OrderRepository from "../../../interfaces/repositories/orderRepository.js";
import RefundRepository from "../../../interfaces/repositories/refundRepository.js";
import ReturnRepository from "../../../interfaces/repositories/returnsRepository.js";
import ProductRepository from "../../../interfaces/repositories/productRepository.js";

export async function createRefund(return_id, refundData) {
  const refundRepository = new RefundRepository();
  const returnRepository = new ReturnRepository();
  const ret = await returnRepository.findReturnById(return_id);
  if (!ret) {
    throw new Error(`Return item with ID ${return_id} not found`);
  }
  if (ret.status === "approved") {
    const refund_data = new Refund({
      return_id: return_id,
      refund_amount: ret.return_amount,
      status: refundData.status,
      payment_method: refundData.payment_method,
    });
    const saveRefund = await refundRepository.create(refund_data);
    //console.log(saveRefund);
    await returnRepository.update(return_id, { status: "pending" });
    return saveRefund;
  } else {
    throw new Error(
      `Refund item with ID ${return_id} have status: ${ret.status}`
    );
  }
}

export async function findRefundById(refundId) {
  const refundRepository = new RefundRepository();
  const refund = await refundRepository.findRefundById(refundId);
  if (!refund) {
    throw new Error(
      `Refund item with ID ${refundId} not found`
    );
  }
  return refund;
}

export async function findAllOrders() {
  const ur = new OrderRepository();
  return ur.findAll();
}

export async function changeStatusRefund(refundId, refundData) {
  const returnRepository = new ReturnRepository();
  const orderItemsRepository = new OrderItemsRepository();
  const orderRepository = new OrderRepository();
  const refundRepository = new RefundRepository();
  const producRepository = new ProductRepository();

  // Search the refund
  const refundFound = await refundRepository.findRefundById(refundId);
  if (!refundFound) {
    throw new Error(`Refound with ID ${refundId} not found`);
  }

  if (refundFound.status === "rejected") {
    throw new Error(`Refound with ID ${refundId} was rejected!`);
  }

  if (refundFound.status === "returned") {
    throw new Error(`Refound with ID ${refundId} was returned!`);
  }
  // Refund exist! then, search the return by id
  const returnFound = await returnRepository.findReturnById(
    refundFound.return_id
  );
  if (!returnFound) {
    throw new Error(`Return with ID ${refundFound.return_id} not found`);
  }

  // Return exist! then, search the Order Item to returned or change status
  const orderItemFound = await orderItemsRepository.findOrderItemsById(
    returnFound.order_item
  );
  if (!orderItemFound) {
    throw new Error(`Order item with ID ${returnFound.order_item} not found`);
  }
  
  if (orderItemFound.status === "returned") {
    throw new Error(`Order item with ID ${orderItemFound.order_item_id} was returned!`);
  }
  // Change status on refund

  const orderFound = await orderRepository.findOrderById(
    orderItemFound.order_id
  );
  if (!orderFound) {
    throw new Error(`Order with ID ${orderItemFound.order_id} not found`);
  }
  const newTotal = orderFound.total_amount - refundFound.refund_amount;
  const newSubTotal = newTotal / 1.12;
  const newIva = newTotal - newSubTotal;

  await refundRepository.update(refundId, { status: refundData.status });
  await returnRepository.update(refundFound.return_id, {
    status: refundData.status === "requested" ? "pending" : refundData.status,
  });
  await orderItemsRepository.update(returnFound.order_item, {
    status: refundData.status,
  });
  if (refundData.status === "returned") {
    await orderRepository.update(orderItemFound.order_id, {
      total_amount: newTotal,
      sub_total: newSubTotal,
      iva: newIva,
      observations: `The refund of ${refundFound.refund_amount} was made.`,
    });
    const prod = await producRepository.findByCode(orderItemFound.product);
    await producRepository.update(orderItemFound.product, {
      stock: prod.stock + orderItemFound.quantity
    })
  }
  return refundRepository.findRefundById(refundId);
}
