import express from "express";
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controller/product.controller.js";

const productRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 685a6d8d2b8f9c1234567890
 *         title:
 *           type: string
 *           example: T-SHIRT WITH TAPE DETAILS
 *         slug:
 *           type: string
 *           example: t-shirt-with-tape-details
 *         category:
 *           type: string
 *           example: Casual
 *         image:
 *           type: string
 *           example: 6a36255aa88297ff8653ca50
 *         rating:
 *           type: number
 *           example: 4.3
 *         discount:
 *           type: number
 *           example: 10
 *         price:
 *           type: number
 *           example: 120
 *         deleted:
 *           type: boolean
 *           example: false
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags:
 *       - Products
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 12
 *
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *
 *       - in: query
 *         name: minRating
 *         schema:
 *           type: number
 *
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [newest, oldest, priceAsc, priceDesc, ratingDesc]
 *
 *     responses:
 *       200:
 *         description: Products fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 list:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: number
 *                     limit:
 *                       type: number
 *                     total:
 *                       type: number
 *                     totalPages:
 *                       type: number
 *                     hasNextPage:
 *                       type: boolean
 *                     hasPreviousPage:
 *                       type: boolean
 */
productRouter.get("/", getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */
productRouter.get("/:id", getProductById);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create product
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - category
 *               - title
 *               - image
 *               - price
 *             properties:
 *               category:
 *                 type: string
 *                 example: Casual
 *               title:
 *                 type: string
 *                 example: T-SHIRT WITH TAPE DETAILS
 *               image:
 *                 type: string
 *                 example: 6a36255aa88297ff8653ca50
 *               price:
 *                 type: number
 *                 example: 120
 *               discount:
 *                 type: number
 *                 example: 10
 *               rating:
 *                 type: number
 *                 example: 4.3
 *     responses:
 *       201:
 *         description: Product created successfully
 */
productRouter.post("/", createProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   patch:
 *     summary: Update product
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               image:
 *                 type: string
 *               price:
 *                 type: number
 *               discount:
 *                 type: number
 *               rating:
 *                 type: number
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 */
productRouter.patch("/:id", updateProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete product
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: Product deleted successfully
 *       404:
 *         description: Product not found
 */
productRouter.delete("/:id", deleteProduct);

export default productRouter;