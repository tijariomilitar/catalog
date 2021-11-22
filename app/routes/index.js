const router = require("express").Router();

const homeController = require("../controller/home");

router.get("/", homeController.index);

router.get("/login", homeController.login);
router.get("/signup", homeController.signup);
router.get("/logout", homeController.logout);

router.use("/user", require("./user"));

module.exports = router;