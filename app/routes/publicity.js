const router = require("express").Router();

const publicityController = require('../controller/publicity');

router.get('/', publicityController.index);

module.exports = router;