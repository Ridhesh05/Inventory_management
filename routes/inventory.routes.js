const router = require("express").Router();
const { v4: uuid } = require("uuid");
const store = require("../data/store");
const { calculateStock } = require("../services/inventory.service");

router.post("/stock-in", (req, res) => {
  store.stockMovements.push({
    id: uuid(),
    productId: req.body.productId,
    type: "STOCK_IN",
    quantity: req.body.quantity,
    timestamp: Date.now()
  });
  res.json({ success: true });
});

router.post("/stock-damage", (req, res) => {
  store.stockMovements.push({
    id: uuid(),
    productId: req.body.productId,
    type: "STOCK_DAMAGE",
    quantity: req.body.quantity,
    timestamp: Date.now()
  });
  res.json({ success: true });
});

router.get("/:productId", (req, res) => {
  res.json({
    stock: calculateStock(req.params.productId, store)
  });
});

module.exports = router;
