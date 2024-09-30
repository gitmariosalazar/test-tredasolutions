class Order {
  constructor({
    order_id,
    customer,
    total_amount,
    sub_total,
    iva,
    status,
    observations,
    createdAt,
    updatedAt,
  }) {
    (this.order_id = order_id),
      (this.customer = customer),
      (this.total_amount = total_amount),
      (this.sub_total = sub_total),
      (this.iva = iva),
      (this.status = status),
      (this.createdAt = createdAt),
      (this.updatedAt = updatedAt);
    this.observations=observations
  }
}

export default Order;