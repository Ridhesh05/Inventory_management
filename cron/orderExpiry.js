const store = require("../data/store");

setInterval(() => {
  const now = Date.now();
  store.orders.forEach(o => {
    if (o.status === "PENDING" && now > o.expiresAt) {
      o.status = "EXPIRED";
    }
  });
}, 60000);
