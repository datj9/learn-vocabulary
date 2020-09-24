const router = require("express").Router();
const wordController = require("./controller");
const { authenticate, authorize } = require("../../../middlewares/auth");

router.get("/get-words-by-text", wordController.getWordsByText);
router.post("/", authenticate, authorize(["admin"]), wordController.createWord);
router.put("/", authenticate, authorize(["admin"]), wordController.updateWord);

module.exports = router;
