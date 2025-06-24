const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    dialect: "postgres",
    pool: {
      max: 10, // tối đa 10 connections
      min: 0,
      acquire: 3000, // thời gian tối đa để lấy connection (ms)
      idle: 10000, // thời gian connection không hoạt động trước khi bị đóng
    },
    logging: true, // xem log SQL
  }
);

module.exports = sequelize;
