const router = require("express").Router();
const { v4: uuid } = require("uuid");
const store = require("../data/store");
const { isAdmin } = require("../utils/auth");

// User register
router.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  if (store.users.find(u => u.email === email))
    return res.status(400).json({ message: "User exists" });

  const user = { id: uuid(), name, email, password };
  store.users.push(user);

  res.json(user);
});

// User login
router.post("/login", (req, res) => {
  const user = store.users.find(
    u => u.email === req.body.email && u.password === req.body.password
  );

  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  res.json(user);
});

// Admin login
router.post("/admin-login", (req, res) => {
  if (!isAdmin(req.body.email, req.body.password))
    return res.status(401).json({ message: "Invalid admin credentials" });

  res.json({ role: "admin" });
});

module.exports = router;
