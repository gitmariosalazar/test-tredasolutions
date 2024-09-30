import {configDotenv} from "dotenv";
configDotenv()

export const LISTEN_PORT = process.env.LISTEN_PORT;
export const DB_USERNAME = process.env.DB_USERNAME
export const DB_DATABASE = process.env.DB_DATABASE
export const DB_PASSWORD = process.env.DB_PASSWORD
export const DB_PORT = process.env.DB_PORT
export const SECRET_KEY = process.env.SECRET_KEY
export const DB_HOSTNAME = process.env.DB_HOSTNAME