import { order_items } from "../../infrastructure/database/models/OrderItems.js";
import { orders } from "../../infrastructure/database/models/Orders.js";
import OrderRepository from "./orderRepository.js";
import ProductRepository from "./productRepository.js";

class OrderItemsRepository {
  async create(orderItemsData) {
    const order = await order_items.create(orderItemsData);
    return order;
  }
  async findByOrderItemsByIdOrder(order_id) {
    const order = await order_items.findAll({
      where: {
        order_id: order_id,
      },
    });
    return order;
  }

  async findOrderItemsById(order_item) {
    const order = await order_items.findOne({
      where: {
        order_item_id: order_item,
      },
    });
    return order;
  }

  
  async update(order_item, orderItemsData) {
    await order_items.update(orderItemsData, {
      where: { order_item_id: order_item },
    });
    return this.findOrderItemsById(order_item);
  }

  async GetOrderFromItems(items) {
    const itemsArray = Array.isArray(items) ? items : [items];
    const pr = new ProductRepository();
    for (const val of itemsArray) {
      const item = JSON.parse(val);
      const prod = await pr.findByCode(item.code);
      console.log(prod);
    }
    return null;
  }

  async findAll() {
    return order_items.findAll();
  }
}

export default OrderItemsRepository;
