import { sequelize } from "../config/connectdb.js";
import { DataTypes } from "sequelize";  
import { returns } from "./Returns.js";

export const refunds = sequelize.define('refunds', {
  refund_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  return_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: returns,
      key: 'return_id'
    }
  },
  refund_amount: {
    type: DataTypes.DECIMAL(10,2)
  },
  status: {
    type: DataTypes.STRING
  },
  payment_method: {
    type: DataTypes.STRING
  }
}, {
  timestamps: true
});

refunds.hasOne(returns, {
  foreignKey: 'return_id',
  sourceKey: 'refund_id',
  as: 'return'
});

returns.belongsTo(refunds, {
  foreignKey: 'return_id',
  targetKey: 'refund_id',
  as: 'refund'
});
