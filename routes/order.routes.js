const router = require("express").Router();
const { v4: uuid } = require("uuid");
const store = require("../data/store");
const { calculateStock } = require("../services/inventory.service");

// Place order
router.post("/", (req, res) => {
  const { userId, items } = req.body;

  for (const i of items) {
    if (calculateStock(i.productId, store) < i.qty)
      return res.status(400).json({ message: "Insufficient stock" });
  }

  const order = {
    id: uuid(),
    userId,
    items,
    status: "PENDING",
    reservedAt: Date.now(),
    expiresAt: Date.now() + 24 * 60 * 60 * 1000
  };

  store.orders.push(order);
  res.json(order);
});

// Pay order
router.post("/:id/pay", (req, res) => {
  const order = store.orders.find(o => o.id === req.params.id);
  if (!order || order.status !== "PENDING")
    return res.status(400).json({ message: "Invalid order" });

  order.items.forEach(i => {
    store.stockMovements.push({
      id: uuid(),
      productId: i.productId,
      type: "STOCK_OUT",
      quantity: i.qty,
      timestamp: Date.now()
    });
  });

  order.status = "PAID";
  res.json(order);
});

router.get("/user/:userId", (req, res) => {
  res.json(store.orders.filter(o => o.userId === req.params.userId));
});

module.exports = router;
