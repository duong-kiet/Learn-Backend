import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.POSTGRES_DB || "",
  process.env.POSTGRES_USER || "",
  process.env.POSTGRES_PASSWORD || "",
  {
    host: process.env.POSTGRES_HOST || "",
    port: parseInt(process.env.POSTGRES_PORT || ""),
    dialect: "postgres",
    pool: {
      max: 10, // max 10 connections
      min: 0,
      acquire: 3000, // max time to get connection (ms)
      idle: 10000, // max time to keep connection alive (ms)
    },
    logging: true, // show SQL logs
  }
);

export { sequelize };
