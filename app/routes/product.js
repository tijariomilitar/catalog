const router = require("express").Router();

const productController = require('../controller/product');

router.get('/index', productController.index);

router.get('/', productController.list);
router.get('/id/:id', productController.findById);
router.get('/code/:code', productController.findByCode);
router.get('/name/:name', productController.findByName);
router.get('/filter', productController.filter);

router.get('/categoryList', productController.categoryList);

router.get('/colorList', productController.colorList);

module.exports = router;