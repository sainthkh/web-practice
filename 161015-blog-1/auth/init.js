function init(app) {
	app.get('/login', login)
	app.get('/signup', signup)
}

function login(req, res) {
	res.render('auth/login')
}

function signup(req, res) {
	res.render('auth/signup')
}


module.exports = init