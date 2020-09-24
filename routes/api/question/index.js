const router = require("express").Router();
const questionController = require("./controller");

router.post("/", questionController.createQuestion);
router.put("/:questionId", questionController.updateQuestion);

module.exports = router;
