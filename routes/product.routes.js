const router = require("express").Router();
const { v4: uuid } = require("uuid");
const store = require("../data/store");

// Add product (admin)
router.post("/", (req, res) => {
  const product = {
    id: uuid(),
    name: req.body.name,
    category: req.body.category,
    unit: req.body.unit,
    createdAt: Date.now()
  };
  store.products.push(product);
  res.json(product);
});

// Get products
router.get("/", (_, res) => {
  res.json(store.products);
});

module.exports = router;
