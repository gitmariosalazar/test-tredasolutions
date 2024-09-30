import Order from "../../../domain/entities/order.entitie.js";
import OrderItem from "../../../domain/entities/orderitem.entitie.js";
import Product from "../../../domain/entities/product.entitie.js";
import OrderItemsRepository from "../../../interfaces/repositories/orderItemsRepository.js";
import OrderRepository from "../../../interfaces/repositories/orderRepository.js";
import ProductRepository from "../../../interfaces/repositories/productRepository.js";
import { findByCode } from "../products/product.services.js";

export async function createOrder(items, customer) {
  const orderRepository = new OrderRepository();
  const orderItemsRepository = new OrderItemsRepository();
  const productRepository = new ProductRepository();

  let total = 0;
  if (items.length == 0) {
    throw new Error(
      `Order items array is empty`
    );
  }
  // Procesar los detalles de la orden y calcular el total
  const details = await Promise.all(
    items.map(async (val) => {
      const product = await findByCode(val.code);
      const productData = new Product(product);

      const totalAmount = productData.price * val.quantity;
      total += totalAmount;

      return new OrderItem({
        product: val.code,
        quantity: val.quantity,
        unit_price: productData.price,
        total_amount: totalAmount,
      });
    })
  );
  // Crear la orden principal
  const order = new Order({
    customer: customer,
    total_amount: total,
    sub_total: total / 1.12,
    iva: total - total / 1.12,
    status: "completed",
  });
  const savedOrder = await orderRepository.create(order);
  if (savedOrder) {
    // Actualizar el inventario y crear los elementos de la orden
    await Promise.all(
      details.map(async (item) => {
        item.order_id = savedOrder.order_id;
        const product = await findByCode(item.product);
        const productData = new Product(product);
        productData.stock -= item.quantity;
        await productRepository.update(item.product, productData);
        await orderItemsRepository.create(item);
      })
    );
  }

  return orderRepository.findOrderById(savedOrder.order_id);
}

export async function findOrderById(order_id) {
  const orderRepository = new OrderRepository();
  const order = await orderRepository.findOrderById(order_id);
  return order;
}

export async function findAllOrders() {
  const ur = new OrderRepository();
  return ur.findAll();
}
