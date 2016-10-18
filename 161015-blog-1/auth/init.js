function init(app) {
	app.get('/login', login)
}

function login(req, res) {
	res.render('auth/login')
}



module.exports = init