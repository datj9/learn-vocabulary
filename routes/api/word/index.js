const router = require("express").Router();
const wordController = require("./controller");
const { authenticate, authorize } = require("../../../middlewares/auth");
const { uploadSingle } = require("../../../middlewares/upload");

router.get("/get-words-by-text", wordController.getWordsByText);
router.post("/", authenticate, authorize(["admin"]), wordController.createWord);
router.post("/upload-image", authorize(["admin"]), uploadSingle("image"));
router.put("/", authenticate, authorize(["admin"]), wordController.updateWord);

module.exports = router;
