import { sequelize } from "../config/connectdb.js";
import { DataTypes } from "sequelize";
import { order_items } from "./OrderItems.js";

export const returns = sequelize.define('returns',{
  return_id:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  order_item: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references:{
      model: order_items,
      key:'order_item_id'
    }
  },
  reason:{
    type: DataTypes.STRING,
    allowNull: false
  },
  status:{
    type: DataTypes.STRING
  },
  return_amount: {
    type: DataTypes.DECIMAL(10,2)
  }
},{
  timestamps: true
})

order_items.hasMany(returns, {
  foreignKey: 'order_item',
  targetKey: 'return_id' 
});

returns.belongsTo(order_items, {
  foreignKey: 'order_item',
  sourceKey: 'order_item',
  as: 'oi'
});
