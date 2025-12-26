const router = require("express").Router();
const { v4: uuid } = require("uuid");
const store = require("../data/store");
const { calculateStock } = require("../services/inventory.service");

router.post("/stock-in", (req, res) => {
  const { productId, quantity } = req.body;
  const store = require("../data/store");

  store.stockMovements.push({
    productId,
    type: "STOCK_IN", // EXACT
    quantity: Number(quantity),
    timestamp: Date.now()
  });

  res.json({ success: true });
});


router.post("/stock-damage", (req, res) => {
  const { productId, quantity } = req.body;
  const store = require("../data/store");

  store.stockMovements.push({
    productId,
    type: "STOCK_DAMAGE",
    quantity: Number(quantity),
    timestamp: Date.now()
  });

  res.json({ success: true });
});


router.post("/stock-out", (req, res) => {
  store.stockMovements.push({
    id: uuid(),
    productId: req.body.productId,
    type: "OUT", // 🔥 IMPORTANT
    quantity: req.body.quantity,
    timestamp: Date.now()
  });

  res.json({ success: true });
});


router.get("/:productId", (req, res) => {
  const { productId } = req.params;
  const { calculateStock } = require("../services/inventory.service");

  const stock = calculateStock(productId);
  res.json({ stock });
});




router.get("/", (req, res) => {
  const summary = store.products.map(product => {
    const stock = calculateStock(product.id, store);

    return {
      productId: product.id,
      name: product.name,
      stock,
      minStock: product.minStock,
      status: stock <= product.minStock ? "LOW_STOCK" : "OK"
    };
  });

  res.json(summary);
});

module.exports = router;
