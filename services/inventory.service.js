function calculateStock(productId, store) {
  let stock = 0;

  store.stockMovements.forEach(m => {
    if (m.productId !== productId) return;
    if (m.type === "STOCK_IN") stock += m.quantity;
    if (m.type === "STOCK_OUT") stock -= m.quantity;
    if (m.type === "STOCK_DAMAGE") stock -= m.quantity;
  });

  return stock;
}

module.exports = { calculateStock };
