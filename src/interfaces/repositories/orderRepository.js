import { order_items } from "../../infrastructure/database/models/OrderItems.js";
import { orders } from "../../infrastructure/database/models/Orders.js";

class OrderRepository{
  async create(orderData){
    //const {customer, total_amount, status, sub_total, iva} = orderData;
    const order = await orders.create(orderData);
    const aux = await orders.findOne({
      where: {order_id: order.order_id},
      include:[
        {
          model: order_items,
          as: 'order_item',
          attributes:['order_item_id','order_id','product','quantity','unit_price','total_amount']
        }
      ]
    });
    return aux;
  }

  async findOrderById(order_id){
    const order = await orders.findOne({
      where: {
        order_id: order_id
      },
      include:[
        {
          model: order_items,
          as: 'order_item',
          attributes:['order_item_id','order_id','product','quantity','unit_price','total_amount']
        }
      ]
    })
    return order;
  }

  async update(order_id, orderData){
    await orders.update(orderData, {
      where:{order_id: order_id}
    });
    return this.findOrderById(order_id);
  }

  async findAll() {
    return orders.findAll({
      include:[
        {
          model: order_items,
          as: 'order_item',
          attributes:['order_item_id','order_id','product','quantity','unit_price','total_amount']
        }
      ]
    });
  }

  async delete(order_id) {
    const order = await this.findByOrderId(order_id);
    if (order) {
        await orders.destroy({ where: { order_id: order_id } });
        return true;
    }
    return false;
}
}

export default OrderRepository;