const router = require("express").Router();
const authController = require("./controller");

router.post("/sign-up", authController.signUp);
router.post("/sign-in", authController.signIn);
router.get("/generate-refresh-token", authController.generateNewRefreshToken);

module.exports = router;
