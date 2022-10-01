const router = require("express").Router();
const auth = require("../../controllers/public/auth");
const Common = require("../../helpers/common");

router.post("/login", auth.login);

module.exports = router;
