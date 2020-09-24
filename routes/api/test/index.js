const router = require("express").Router();
const testController = require("./controller");
const { authenticate, authorize, checkToken } = require("../../../middlewares/auth");

router.get("/", checkToken, testController.getTests);
router.get("/:testId", checkToken, testController.getTestById);
router.post("/", authenticate, authorize(["admin"]), testController.createTest);
router.put("/:testId", authenticate, authorize(["admin"]), testController.updateTest);
router.patch("/:testId", authenticate, authorize(["admin"]), testController.updateIsPublicOfTest);

module.exports = router;
