const router = require("express").Router();
const testController = require("./controller");
const { authenticate, authorize, checkToken } = require("../../../middlewares/auth");
const { uploadSingle } = require("../../../middlewares/upload");

router.get("/", checkToken, testController.getTests);
router.get("/:testId", checkToken, testController.getTestById);
router.post("/", authenticate, authorize(["admin"]), testController.createTest);
router.post("/upload-image", authenticate, authorize(["admin"]), uploadSingle("image"));
router.put("/:testId", authenticate, authorize(["admin"]), testController.updateTest);
router.patch("/:testId", authenticate, authorize(["admin"]), testController.updateIsPublicOfTest);

module.exports = router;
