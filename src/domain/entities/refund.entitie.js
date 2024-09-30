class Refund {
  constructor(
    {refund_id,
    return_id,
    refund_amount,
    status,
    payment_method,
    createdAt = new Date(),
    updatedAt = new Date()}
  ) {
    this.refund_id = refund_id;
    this.return_id = return_id;
    this.refund_amount = refund_amount;
    this.status = status;
    this.payment_method = payment_method;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
export default Refund;
