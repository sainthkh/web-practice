const fs = require('fs')
const jsyaml = require('js-yaml');
const Sequelize = require("sequelize");

var Post, User;

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
		.then(seq => {
			User = seq.define('User', {
				username: { type: Sequelize.STRING, primaryKey: true, unique: true },
				first_name: Sequelize.STRING(30),
				last_name: Sequelize.STRING(30),
				email: Sequelize.STRING(255),
				password: Sequelize.STRING,
				is_staff: Sequelize.BOOLEAN,
				is_active: Sequelize.BOOLEAN,
				is_superuser: Sequelize.BOOLEAN,
				last_login: Sequelize.DATE,
				date_joined: Sequelize.DATE,
			})

			Post = seq.define('Post', {
				slug: { type: Sequelize.STRING, primaryKey: true, unique: true },
				title: Sequelize.TEXT,
				body: Sequelize.TEXT,
				published: Sequelize.DATE,
				created: Sequelize.DATE,
				updated: Sequelize.DATE,
				status: Sequelize.STRING(10),
				user_id: {
					type: Sequelize.STRING,
					
					references: {
						model: User,
						key: 'username'
					}
				}
			})
		})
	})
}

