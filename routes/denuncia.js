const express = require("express");
const router = express.Router();
const { create, list, read, update, remove, removeSoft,listAll,denunciasCount } = require("../Controllers/denuncia");

// endpoints
router.post("/denuncia", create);
router.get("/denuncia/:slug", read);
router.put("/denuncia/:slug", update);
router.patch("/denuncia/:slug", removeSoft);
router.delete("/denuncia/:slug", remove); 

router.get("/denuncias", listAll);
router.get("/denuncias/total", denunciasCount);
router.post("/denuncias", list);

module.exports = router;