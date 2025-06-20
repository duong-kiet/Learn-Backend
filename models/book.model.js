const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");
const slugify = require("slugify");

const Book = sequelize.define(
  "Book",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: DataTypes.STRING,
    price: DataTypes.INTEGER,
    thumbnail: {
      type: DataTypes.STRING,
      defaultValue:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2Fnr4MP6hS6Q3YBzvIQamlLZGyhoRIjzZVT4nFkYA6ytp7L1b_VAma-zSl3co66Rbg14&usqp=CAU",
    },
    description: {
      type: DataTypes.TEXT,
      defaultValue: "This is a great book",
    },
    sold: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    tableName: "books",
    timestamps: false,
  }
);

// Hook tự động tạo slug trước khi tạo bản ghi
Book.beforeCreate((book) => {
  if (!book.slug && book.title) {
    book.slug = slugify(book.title, { lower: true, strict: true });
  }
});

// Hook tự động cập nhật slug khi đổi title
Book.beforeUpdate((book) => {
  if (book.changed("title")) {
    book.slug = slugify(book.title, { lower: true, strict: true });
  }
});

module.exports = Book;
