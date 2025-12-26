const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const inventoryRoutes = require("./routes/inventory.routes");
const orderRoutes = require("./routes/order.routes");
const adminRoutes = require("./routes/admin.routes");

const { adminLogin } = require("./utils/auth");
const store = require("./data/store");

// ✅ INIT APP FIRST
const app = express();
app.use(cors());
app.use(express.json());

// ✅ BASIC HEALTH CHECK
app.get("/", (_, res) => res.send("Inventory backend running"));

// ✅ ADMIN LOGIN
app.post("/admin/login", (req, res) => {
  const { email, password } = req.body;
  console.log("LOGIN ATTEMPT:", email, password);

  if (adminLogin(email, password)) {
    return res.status(200).json({ success: true });
  }

  res.status(401).json({ message: "Invalid admin credentials" });
});
app.post("/inventory/in", (req, res) => {
  const { productId, quantity } = req.body;

  store.stockMovements.push({
    productId,
    quantity,
    type: "IN",
    date: new Date()
  });

  res.json({ success: true });
});

app.get("/inventory/:productId", (req, res) => {
  const productId = Number(req.params.productId);

  const movements = store.stockMovements.filter(
    m => m.productId === productId
  );

  const stock = movements.reduce((sum, m) => {
    return m.type === "IN"
      ? sum + m.quantity
      : sum - m.quantity;
  }, 0);

  res.json({ stock });
});

// ✅ ADMIN PRODUCTS (THIS WAS BROKEN BEFORE)
app.get("/admin/products", (req, res) => {
  res.json(store.products);
});

app.post("/admin/products", (req, res) => {
  const { name, category, unit } = req.body;

  const newProduct = {
    id: Date.now(),
    name,
    category,
    unit,
    stock: 0
  };

  store.products.push(newProduct);
  res.status(201).json(newProduct);
});

// ✅ OTHER ROUTES
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/inventory", inventoryRoutes);
app.use("/orders", orderRoutes);
app.use("/admin", adminRoutes);

// ✅ CRON (AFTER ROUTES)
require("./cron/orderExpiry");

// ✅ START SERVER
const PORT = 5001;
app.listen(PORT, () =>
  console.log(`Backend running on http://localhost:${PORT}`)
);
