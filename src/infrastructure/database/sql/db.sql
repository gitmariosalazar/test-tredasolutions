
create table user_types(
  user_type_id serial not null,
  name varchar(25) not null,
  description varchar(150),
  created_at date,
  updated_at date,
  constraint pk_usertypeid primary key(user_type_id)
);

create table users(
  user_id serial not null,
  email varchar(60) unique not null,
  password varchar(255) not null,
  firstname varchar(100) not null,
  lastname varchar(100) not null,
  is_active boolean not null,
  created_at date,
  updated_at date,
  user_type integer not null,
  constraint pk_userid primary key(user_id),
  constraint fk_usertype_user foreign key(user_type) references user_types(user_type_id)
);

create table products(
  product_id serial not null,
  code varchar(25) not null unique,
  name varchar(100) not null,
  description varchar(150),
  price numeric(10,2) not null,
  stock integer not null,
  created_at date,
  updated_at date,
  constraint pk_productid primary key(product_id)
);

create table orders(
  order_id serial not null,
  customer integer not null,
  total_amount numeric(10,2) not null,
  sub_total numeric(10,2) not null,
  iva numeric(10,2) not null,
  status varchar(25) not null,
  created_at date,
  updated_at date,
  constraint pk_orderid primary key(order_id),
  constraint fk_user_orders foreign key(customer) references users(user_id)
);

create table order_items(
  order_item_id serial not null,
  order_id integer not null,
  product integer not null,
  quantity integer not null,
  unit_price numeric(10,2) not null,
  total_amount numeric(10,2) not null,
  status varchar(50),
  created_at date,
  updated_at date,
  constraint pk_orderitemid primary key(order_item_id),
  constraint fk_orser_oitem foreign key(order_id) references orders(order_id),
  constraint fk_product_oitem foreign key(product) references products(product_id)
);

create table returns(
  return_id integer not null,
  order_item integer not null,
  reason varchar(150) not null,
  status varchar(20) not null,
  return_amount numeric(10,2) not null,
  created_at date,
  updated_at date,
  constraint pk_returnid primary key(return_id),
  constraint fk_oitem_returns foreign key(order_item) references order_items(order_item_id)
);

create table refunds(
  refund_id serial not null,
  return integer not null,
  refund_amount numeric(10,2) not null,
  status varchar(20) not null,
  payment_method varchar(20) not null,
  created_at date,
  updated_at date,
  constraint pk_refundid primary key(refund_id),
  constraint fk_return_refund foreign key(return) references returns(return_id)
);
