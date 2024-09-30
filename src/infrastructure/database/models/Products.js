import { sequelize } from "../config/connectdb.js";
import { DataTypes } from "sequelize";
import { user_types } from "./UserTypes.js";


export const products = sequelize.define('products', {
  code:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    primaryKey: true
  },
  name:{
    type: DataTypes.STRING,
    allowNull: false
  },
  description:{
    type: DataTypes.STRING
  },
  price:{
    type: DataTypes.DECIMAL(10,2),
  },
  stock: {
    type: DataTypes.INTEGER
  }
},{
  timestamps: true
})
