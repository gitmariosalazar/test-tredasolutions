import { sequelize } from "../config/connectdb.js";
import { DataTypes } from "sequelize";
import { users } from "./Users.js";


export const orders = sequelize.define(
  "orders",
  {
    order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    customer: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: users,
        key: "user_id",
      },
    },
    total_amount: {
      type: DataTypes.DECIMAL(10, 2),
    },
    iva: {
      type: DataTypes.DECIMAL(10, 2),
    },
    sub_total: {
      type: DataTypes.DECIMAL(10, 2),
    },
    status: {
      type: DataTypes.STRING,
    },
    observations: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    timestamps: true,
  }
);

users.hasMany(orders, {
  foreignKey: 'customer',
  sourceKey: 'user_id'
});

orders.belongsTo(users, {
  foreignKey: 'customer',
  targetKey: 'user_id'
});