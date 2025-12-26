const ADMIN = {
  email: "admin@inventory.com",
  password: "admin123"
};

function isAdmin(email, password) {
  return email === ADMIN.email && password === ADMIN.password;
}

module.exports = { ADMIN, isAdmin };
