const router = require("express").Router();
const authController = require("./controller");

router.post("/sign-up", authController.signUp);
router.post("/sign-in", authController.signIn);
router.get("/generate-access-token", authController.generateNewAccessToken);

module.exports = router;
