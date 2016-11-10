const fs = require('fs')
const jsyaml = require('js-yaml');
const Sequelize = require("sequelize");

var seq;

exports.seq = function() {
	if (seq) return seq

	return new Promise(function(resolve, reject) {
		fs.readFile(__dirname + '/sqlite.yaml', 'utf8', (err, data) => {
			if (err) reject(err)
			else resolve(data)
		})
		.then(yamltext => {
			return jsyaml.safeLoad(yamltext, 'utf8')
		})
		.then(params => {
			seq = new Sequelize(params.dbname, params.username, params.password, params.params)
			return seq
		})
	})
}

