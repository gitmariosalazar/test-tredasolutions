import { DataTypes } from "sequelize";
import { user_types } from "./UserTypes.js";
import { sequelize } from "../config/connectdb.js";

export const users = sequelize.define('users', {
  user_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  user_type: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: user_types,
      key: 'user_type_id'
    }
  }
}, {
  timestamps: true
});

user_types.hasMany(users, {
  foreignKey: 'user_type',
  sourceKey: 'user_type_id'
});

users.belongsTo(user_types, {
  foreignKey: 'user_type',
  targetKey: 'user_type_id',
  as: 'user_types'
});
