const router = require("express").Router();

router.use("/auth", require("./auth"));
router.use("/words", require("./word"));
router.use("/tests", require("./test"));
router.use("/questions", require("./question"));

module.exports = router;
