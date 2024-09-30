import { DataTypes } from "sequelize";
import { sequelize } from "../config/connectdb.js";

import { products } from "./Products.js";
import { orders } from "./Orders.js";

export const order_items = sequelize.define('order_items',{
  order_item_id:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  order_id:{
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: orders,
      key:'order_id'
    }
  },
  product:{
    type: DataTypes.STRING,
    allowNull: false,
    references:{
      model: products,
      key:'code'
    }
  },
  quantity:{
    type: DataTypes.INTEGER
  },
  unit_price:{
    type: DataTypes.DECIMAL(10,2)
  },
  total_amount:{
    type:DataTypes.DECIMAL(10,2)
  },
  status: {
    type: DataTypes.STRING
  }
},{
  timestamps: true
})

// orders tiene muchos order_items
orders.hasMany(order_items, {
  foreignKey: 'order_id',
  as: 'order_item'  // Alias que usarás en la consulta
});

// order_items pertenece a un order
order_items.belongsTo(orders, {
  foreignKey: 'order_id',
  as: 'order'  // Alias para referenciar la orden
});

order_items.hasMany(products, {
  foreignKey: 'code',
  sourceKey:'product'
})

products.belongsTo(order_items, {
  foreignKey:'code',
  targetKey: 'product'
})