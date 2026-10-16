const express = require("express");
const router = express.Router();
const entregaControllers = require("../controllers/entregaControllers");
const validarId = require("../middlewares/validarId");

router.param("id", validarId);

router.get("/", entregaControllers.listar);
router.get("/:id", entregaControllers.buscarPorId);
router.post("/", entregaControllers.criar);
router.put("/:id", entregaControllers.atualizar);
router.delete("/:id", entregaControllers.deletar);

module.exports = router;