const ADMIN_EMAIL = "admin@inventory.com";
const ADMIN_PASSWORD = "admin123";

function adminLogin(email, password) {
  return email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
}

module.exports = { adminLogin };
