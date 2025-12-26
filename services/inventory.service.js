function calculateStock(productId) {
  const store = require("../data/store");

  return store.stockMovements
    .filter(m => m.productId === productId)
    .reduce((sum, m) => {
      if (m.type === "STOCK_IN") return sum + m.quantity;
      if (m.type === "STOCK_OUT") return sum - m.quantity;
      if (m.type === "STOCK_DAMAGE") return sum - m.quantity;
      return sum;
    }, 0);
}

module.exports = { calculateStock };
