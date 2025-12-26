const store = {
  users: [],

  products: [
    {
      id: 1,
      name: "Cement",
      category: "Construction Material",
      unit: "Bag"
    },
    {
      id: 2,
      name: "Steel Rod",
      category: "Construction Material",
      unit: "Kg"
    },
    {
      id: 3,
      name: "Tiles",
      category: "Flooring",
      unit: "Box"
    }
  ],

  stockMovements: [
    // INITIAL STOCK (VERY IMPORTANT)
    { productId: 1, quantity: 100, type: "IN" },
    { productId: 2, quantity: 10, type: "IN" },
    { productId: 3, quantity: 20, type: "IN" }
  ],

  orders: []
};

module.exports = store;