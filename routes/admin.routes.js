const router = require("express").Router();
const store = require("../data/store");
const { calculateStock } = require("../services/inventory.service");

router.get("/low-stock", (_, res) => {
  res.json(
    store.products.filter(p => calculateStock(p.id, store) < 10)
  );
});

router.get("/slow-moving", (_, res) => {
  const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000;

  res.json(
    store.products.filter(p =>
      !store.stockMovements.some(
        m =>
          m.productId === p.id &&
          m.type === "STOCK_OUT" &&
          m.timestamp > cutoff
      )
    )
  );
});

module.exports = router;
