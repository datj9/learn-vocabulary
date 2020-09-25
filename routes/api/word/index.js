const router = require("express").Router();
const wordController = require("./controller");
const { authenticate, authorize } = require("../../../middlewares/auth");
const { uploadSingle } = require("../../../middlewares/upload");

router.get("/:text", wordController.getWordsByText);
router.post("/", authenticate, authorize(["admin"]), wordController.createWord);
router.post("/upload-image", authenticate, authorize(["admin"]), uploadSingle("image"));
router.put("/:text", authenticate, authorize(["admin"]), wordController.updateWord);

module.exports = router;
