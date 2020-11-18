const User = require('../model/user');
const userController = require('./user');

const lib = require('../../config/lib');

const publicityController = {
	index: async (req, res) => {
		res.render('publicity/index');
	}
};

module.exports = publicityController;