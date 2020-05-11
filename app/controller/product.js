const User = require('../model/user');
const userController = require('./user');

const lib = require('../../config/lib');

const Product = require('../model/product');

const productController = {
	index: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm', 'man'])){
			return res.redirect("/");
		};

		try{
			const feedstockColors = await Feedstock.colorList();
			const productColors = await Product.colorList();
			res.render('product/index', { productColors, feedstockColors, user: req.user });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao realizar requisição." });
		};
	},
	list: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm','man','n/a'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		try {
			const products = await Product.list();
			res.send({ products });
		} catch (err){
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao listar os produtos." });
		};
	},
	findById: async (req, res) => {
		// if(!await userController.verifyAccess(req, res, ['adm', 'n/a'])){
		// 	return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		// };

		try {
			const product = await Product.findById(req.params.id);
			if(product.length){
				product[0].images = await Product.getImages(product[0].id);
			};
			res.send({ product });
		} catch (err){
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao buscar produto, favor contatar o suporte." });
		};
	},
	findByCode: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm','man','n/a'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		try {
			const product = await Product.findByCode(req.params.code);
			if(product.length){
				product[0].images = await Product.getImages(product[0].id);
			};
			res.send({ product });
		} catch (err){
			console.log(err);
			res.send({ msg: err });
		};
	},
	findByName: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm','man','n/a'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		try {
			let products = await Product.findByName(req.query.name);
			if(products.length){
				products[0].images = await Product.getImages(products[0].id);
				products[0].feedstocks = await Product.getFeedstocks(product[0].id);
			};
			res.send({ products });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao encontrar o produto." });
		};
	},
	filter: async (req, res) => {
		// if(!await userController.verifyAccess(req, res, ['adm', 'n/a'])){
			// return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		// };

		var params = [];
		var values = [];

		if(isNaN(req.query.code) || req.query.code < 0 || req.query.code > 9999){
			req.query.code = "";
		};

		if(req.query.code){
			params.push("code");
			values.push(req.query.code);
		};

		if(req.query.color){
			params.push("color");
			values.push(req.query.color);
		};
		
		try {
			if(req.query.name){
				const products = await Product.filter(req.query.name, params, values);
				for(i in products){
					products[i].images = await Product.getImages(products[i].id);
				};
				res.send({ products });
			} else {
				const products = await Product.filter(false, params, values);
				console.log(products);
				for(i in products){
					products[i].images = await Product.getImages(products[i].id);
				};
				console.log(products);
				res.send({ products });
			};
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao filtrar os produtos." });
		};
	},
	categoryList: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm','n/a'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		try {
			const categories = await Product.categoryList();
			res.send({ categories });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao listar categorias." });
		};
	},
	colorList: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm','man','n/a'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};
	
		try {
			const colors = await Product.colorList();
			res.send(colors);
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao listar as cores, favor contatar o suporte." });
		};
	}
};

module.exports = productController;