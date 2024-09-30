class OrderItem {
  constructor(
    {order_item_id,
    order_id,
    product,
    quantity,
    unit_price,
      total_amount,
    status,
    createdAt = new Date(),
    updatedAt = new Date()}
  ) {
    this.order_item_id = order_item_id;
    this.order_id = order_id;
    this.product = product;
    this.quantity = quantity;
    this.unit_price = unit_price;
    this.total_amount = total_amount;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export default OrderItem;
