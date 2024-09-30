
import { Sequelize } from "sequelize";
import { DB_DATABASE, DB_HOSTNAME, DB_PASSWORD, DB_USERNAME } from "../../../settings/config.js";

export const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOSTNAME,
  dialect: 'postgres'
})
