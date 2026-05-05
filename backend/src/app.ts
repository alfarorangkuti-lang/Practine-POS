import express from "express";
import cors from "cors"
import pool from "./config/db";

import categoriesRoutes from "./routes/categoriesRoutes";
import productsRoutes from "./routes/productsRoutes";

const app = express();

app.use("/uploads", express.static("uploads"));
app.use(cors());
app.use(express.json());

app.use('/products', productsRoutes)
app.use("/categories", categoriesRoutes);


app.get("/", (_, res) => {
  res.status(200).json("Practine POS API");
});

app.listen(8000, () => {
  console.log("Server running on port 8000");
});