const util = require('./util')

module.exports = {
	init: require('./init'), 
	model: require('./model'),
	required: util.ensureAuthenticated
}