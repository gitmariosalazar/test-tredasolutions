class Return {
  constructor(
   { return_id,
    order_item,
    reason,
      status,
    return_amount,
    createdAt = new Date(),
    updatedAt = new Date()}
  ) {
    this.return_id = return_id;
    this.order_item = order_item;
    this.reason = reason;
    this.status = status;
    this.return_amount = return_amount;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
export default Return;
