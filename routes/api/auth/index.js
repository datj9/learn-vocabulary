const router = require("express").Router();
const authController = require("./controller");

router.post("/sign-up", authController.signUp);
router.post("/sign-in", authController.signIn);
router.post("/generate-access-token", authController.generateNewAccessToken);

module.exports = router;
