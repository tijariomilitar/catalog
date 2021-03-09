const db = require('../../config/connection');
const lib = require('../../config/lib');

const Product = function(){
	this.id;
	this.code;
	this.name;
	this.color;
	this.size;
};

Product.save = async (product) => {
	let query = "INSERT INTO cms_wt_erp.product (code, name, color, size, brand, status, image) VALUES ('"
		+product.code+"', '"
		+product.name+"','"
		+product.color+"','"
		+product.size+"','"
		+product.brand+"','"
		+product.status+"','"
		+product.image+"');";
	return db(query);
};

Product.update = async (product) => {
	let query = "UPDATE cms_wt_erp.product SET code='"+product.code
		+"', name='"+product.name
		+"', color='"+product.color
		+"', size='"+product.size
		+"', brand='"+product.brand
		+"', status='"+product.status
		+"', image='"+product.image+"' WHERE id='"+product.id+"';";
	return db(query);
};

Product.list = async () => {
	let query = "SELECT * FROM cms_wt_erp.product ORDER BY code ASC;";
	return db(query);
};

Product.findById = async (id) => {
	let query = "SELECT * FROM cms_wt_erp.product WHERE id='"+id+"';";
	return db(query);
};

Product.findByCode = async (code) => {
	let query = "SELECT * FROM cms_wt_erp.product WHERE code='"+code+"';";
	return db(query);
};

Product.findByName = async (name) => {
	let query = "SELECT * FROM cms_wt_erp.product WHERE name like '%"+name+"%' ORDER BY code ASC;";
	return db(query);
};

Product.filter = async (name, params, values) => {
	let query = lib.filterQueryName(name, params, values, "cms_wt_erp", "product", "code", "ASC");
	return db(query);
};

Product.delete = async (id) => {
	let query = "DELETE FROM cms_wt_erp.product WHERE id='"+id+"';";
	return db(query);
};

Product.image = {
	add: async (image) => {
		let query = "INSERT INTO cms_wt_erp.product_image (product_id, url) VALUES ('"
			+image.product_id+"', '"
			+image.url+"');";
		return db(query);
	},
	list: async (id) => {
		let query = "SELECT * FROM cms_wt_erp.product_image WHERE product_id='"+id+"';";
		return db(query);
	},
	remove: async (image_id) => {
		let query = "DELETE FROM cms_wt_erp.product_image WHERE id='"+image_id+"';";
		return db(query);
	},
	removeByProductId: async (id) => {
		let query = "DELETE FROM cms_wt_erp.product_image WHERE product_id='"+id+"';";
		return db(query);
	}
};

Product.package = {
	save: async (package) => {
		let query = "INSERT INTO cms_wt_erp.product_package (code, name, color, price) VALUES ('"
			+package.code+"', '"
			+package.name+"', '"
			+package.color+"', '"
			+package.price+"');";
		return db(query);
	},
	update: async (package) => {
		let query = "UPDATE cms_wt_erp.product_package SET code='"+package.code
			+"', name='"+package.name
			+"', color='"+package.color
			+"', price='"+package.price+"' WHERE id='"+package.id+"';";
		return db(query);
	},
	filter: async (name, params, values) => {
		let query = lib.filterQueryName(name, params, values, "cms_wt_erp", "product_package", "code", "ASC");
		return db(query);
	},
	findByCode: async (code) => {
		let query = "SELECT * FROM cms_wt_erp.product_package WHERE code='"+code+"';";
		return db(query);
	},
	findById: async (id) => {
		let query = "SELECT * FROM cms_wt_erp.product_package WHERE id='"+id+"';";
		return db(query);	
	},
	delete: async (id) => {
		let query = "DELETE FROM cms_wt_erp.product_package WHERE id='"+id+"';";
		return db(query);
	},
	product: {
		add: async (package_id, product) => {
			let query = "INSERT INTO cms_wt_erp.product_package_product (package_id, product_id, product_code, product_info, amount) VALUES ('"
				+package_id+"','"
				+product.id+"','"
				+product.code+"','"
				+product.info+"','"
				+product.amount+"');";
			return db(query);
		},
		list: async (package_id) => {
			let query = "SELECT * FROM cms_wt_erp.product_package_product WHERE package_id='"+package_id+"' ORDER BY id ASC;";
			return db(query);
		},
		update: async (package_product_id, product) => {
			let query = "UPDATE cms_wt_erp.product_package_product SET amount='"+product.amount+"' WHERE id='"+package_product_id+"';";
			return db(query);
		},
		remove: async (package_product_id) => {
			let query = "DELETE FROM cms_wt_erp.product_package_product WHERE id='"+package_product_id+"';";
			return db(query);
		},
		removeAll: async (package_id) => {
			let query = "DELETE FROM cms_wt_erp.product_package_product WHERE package_id='"+package_id+"';";
			return db(query);
		}
	}
};

Product.catalog = {
	filter: (params, values, inners, status) => {
		let query = lib.filterByLikeAndInnerJoinAndByStatus(params, values, "product_price", inners, "status", status, "cms_wt_erp", "product", "code", "ASC");
		return db(query);
	}
};

Product.categorySave = async (category) => {
	let query = "INSERT INTO backup.product_category (name, shortcut) VALUES ('"+category.name+"','"+category.shortcut+"');";
	return db(query);
};

Product.categoryList = async () => {
	let query = "SELECT * FROM backup.product_category ORDER BY name ASC;";
	return db(query);
};

Product.colorSave = async (color) => {
	let query = "INSERT INTO cms_wt_erp.product_color (name, shortcut) VALUES ('"+color.name+"','"+color.shortcut+"');";
	return db(query);
};

Product.colorList = async () => {
	let query = "SELECT * FROM cms_wt_erp.product_color;";
	return db(query);
};

module.exports = Product;