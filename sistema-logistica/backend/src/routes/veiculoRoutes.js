const express = require("express");
const router = express.Router();
const veiculoControllers = require("../controllers/veiculoControllers");
const validarId = require("../middlewares/validarId");

router.param("id", validarId);

router.get("/", veiculoControllers.listar);
router.get("/:id", veiculoControllers.buscarPorId);
router.post("/", veiculoControllers.criar);
router.put("/:id", veiculoControllers.atualizar);
router.delete("/:id", veiculoControllers.deletar);

module.exports = router;