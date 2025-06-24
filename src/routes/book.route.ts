import express from "express";
const router = express.Router();
import Book from "../models/book.model";

import { authorizeRoles } from "../middlewares/auth.middleware";

// GET /book && /book?page=1&limit=10
router.get("/", authorizeRoles("admin", "user"), async (req, res) => {
  try {
    if (req.query.page || req.query.limit) {
      const page = req.query.page ? parseInt(req.query.page as string) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 8;
      const offset = (page - 1) * limit;

      const { count, rows } = await Book.findAndCountAll({
        where: { deleted: false },
        limit,
        offset,
        attributes: ["id", "title", "author", "price", "thumbnail"],
      });

      res.status(200).json({
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        totalItems: count,
        items: rows,
      });
    } else {
      const books = await Book.findAll({
        where: { deleted: false },
        attributes: ["id", "title", "author", "price", "thumbnail"],
      });

      res.status(200).json(books);
    }
  } catch (err) {
    res.status(500).json({ error: "Lỗi server" });
  }
});

// POST /book
router.post("/", authorizeRoles("admin"), async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// GET /book/:slug
router.get("/:slug", authorizeRoles("admin", "user"), async (req: any, res: any) => {
  try {
    const book = await Book.findOne({
      where: { slug: req.params.slug },
      attributes: ["id", "title", "author", "price", "thumbnail"],
    });

    if (!book) return res.status(404).json({ error: "Không tìm thấy sách" });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: "Lỗi server" });
  }
});

// PATCH /book/:id
router.patch("/:id", authorizeRoles("admin"), async (req: any, res: any) => {
  try {
    const [updated] = await Book.update(req.body, {
      where: { id: req.params.id },
    });

    if (!updated) return res.status(404).json({ error: "Không tìm thấy sách" });

    const updatedBook = await Book.findByPk(req.params.id);
    res.json(updatedBook);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /book/:id/delete
router.delete("/:id/delete", authorizeRoles("admin"), async (req: any, res: any) => {
  try {
    const deleted = await Book.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Không tìm thấy sách" });
    res.json({ message: "Xóa thành công" });
  } catch (err) {
    res.status(500).json({ error: "Lỗi server" });
  }
});

// PATCH /book/:id/delete
router.patch("/:id/delete", authorizeRoles("admin"), async (req: any, res: any) => {
  try {
    const [updated] = await Book.update(
      {
        deleted: true,
      },
      {
        where: { id: req.params.id },
      }
    );

    if (!updated) return res.status(404).json({ error: "Không tìm thấy sách" });

    const updatedBook = await Book.findByPk(req.params.id);
    res.json(updatedBook);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
