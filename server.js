const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const inventoryRoutes = require("./routes/inventory.routes");
const orderRoutes = require("./routes/order.routes");
const adminRoutes = require("./routes/admin.routes");

require("./cron/orderExpiry");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/inventory", inventoryRoutes);
app.use("/orders", orderRoutes);
app.use("/admin", adminRoutes);

app.get("/", (_, res) => res.send("Inventory backend running"));

const PORT = 5001;

app.listen(PORT, () =>
  console.log(`Backend running on http://localhost:${PORT}`)
);
