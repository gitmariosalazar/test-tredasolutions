import { DataTypes } from "sequelize";
import { sequelize } from "../config/connectdb.js";


export const user_types = sequelize.define('user_types', {
  user_type_id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name:{
    type: DataTypes.STRING,
    allowNull: false
  },
  description:{
    type: DataTypes.STRING
  }
},{
  timestamps: true
})

