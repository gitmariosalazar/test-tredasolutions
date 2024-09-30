import Return from "../../../domain/entities/return.entitie.js";
import OrderItemsRepository from "../../../interfaces/repositories/orderItemsRepository.js";
import OrderRepository from "../../../interfaces/repositories/orderRepository.js";
import RefundRepository from "../../../interfaces/repositories/refundRepository.js";
import ReturnRepository from "../../../interfaces/repositories/returnsRepository.js";

// * requested(solicitado);
// * pending(pendiente);
// * approved(aprobado);
// * rejected(rechazado);
// * returned(devuelto);
// * canceled (cancelado)
/**
 * @param {*} orderItemId - Order ID
 * @param {*} returnData - Information about the return (reason and status).
 * @returns {Promise<Return>} - Return created.
 */
export async function createReturns(orderItemId, returnData) {
  const returnRepository = new ReturnRepository();
  const orderItemsRepository = new OrderItemsRepository();
  const verifyReturn = await returnRepository.findReturnByOrderItem(orderItemId);
  if (verifyReturn) {
    throw new Error(
      `A return request already exists for order item with ID ${orderItemId}`
    );
  }
  const orderItem = await orderItemsRepository.findOrderItemsById(orderItemId);
  if (!orderItem) {
    throw new Error(`Order item with ID ${orderItemId} not found`);
  }
  const returnEntry = new Return({
    order_item: orderItemId,
    reason: returnData.reason,
    status: returnData.status,
    return_amount: orderItem.total_amount,
  });
  const savedReturn = await returnRepository.create(returnEntry);

  if (savedReturn) {
    await orderItemsRepository.update(savedReturn.order_item, {
      status: "requested",
    });
  }

  return savedReturn;
}

export async function changeStatus(returnId, returnData) {
  const returnRepository = new ReturnRepository();
  const orderItemsRepository = new OrderItemsRepository();
  const orderRepository = new OrderRepository();
  const refundRepository = new RefundRepository();

  // Refund exist! then, search the return by id
  const returnFound = await returnRepository.findReturnById(returnId);
  if (!returnFound) {
    throw new Error(`Return with ID ${returnId} not found`);
  }

  const aux = await refundRepository.findRefundById(returnId);
if (aux) {
  switch (aux.status) {
    case "rejected":
      throw new Error(`The return with ID ${returnId} has been rejected.`);
    default:
      throw new Error(
        `The return with ID ${returnId} is currently in process.`
      );
  }
}

  if (returnFound.status === "returned") {
    throw new Error(`Return with ID ${returnId} was returned!`);
  }

  // Return exist! then, search the Order Item to returned or change status
  const orderItemFound = await orderItemsRepository.findOrderItemsById(
    returnFound.order_item
  );
  if (!orderItemFound) {
    throw new Error(`Order item with ID ${returnFound.order_item} not found`);
  }

  const orderFound = await orderRepository.findOrderById(
    orderItemFound.order_id
  );
  if (!orderFound) {
    throw new Error(`Order with ID ${orderItemFound.order_id} not found`);
  }
  await returnRepository.update(returnId, {
    status: returnData.status,
  });
  await orderItemsRepository.update(returnFound.order_item, {
    status: returnData.status,
  });
  return returnRepository.findReturnById(returnId);
}

export async function findReturnById(return_id) {
  const ur = new ReturnRepository();
  const aux = await ur.findReturnById(return_id);
  if (!aux) {
    throw new Error(`Return with ID ${return_id} not found`);
  }
  return aux;
}

export async function findAllOrders() {
  const ur = new OrderRepository();
  return ur.findAll();
}
