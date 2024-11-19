const express = require("express");
const { login, protectedContent, rota1, rota2 } = require("./controllers/authController");

const router = express.Router();

// Rota pública
router.get("/", (request, response) => {
  response.json({ message: "Endpoint que não exige autenticação!" });
});

// Rota de login
router.post("/login", login);

// Rota protegida
router.get("/protected", protectedContent);

router.get("/rota1", rota1);

router.get("/rota2", rota2);

module.exports = router;
