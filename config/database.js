const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  "bookstore",
  "postgres",
  process.env.DATABASE_PASSWORD,
  {
    host: "127.0.0.1",
    port: 5432,
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
