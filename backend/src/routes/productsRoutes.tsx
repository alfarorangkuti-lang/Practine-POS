import express from "express";
import { authMiddleware } from "../middleware/auth";
import { destroy, getProductById, getProducts, create, update } from "../controllers/productController";
import upload from "../lib/multer";

const router = express.Router();

router.use(authMiddleware)

router.get("/", getProducts)
router.get("/:id", getProductById)
router.delete("/:id", destroy)
router.post('/', upload.single("image") , create)
router.put('/:id', upload.single("image") , update)


export default router;