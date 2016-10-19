"use strict";

const user = require('./model')

function init(app) {
	app.get('/login', login)
	app.get('/signup', signup)
	app.post('/signup', post_signup)
}

function login(req, res) {
	res.render('auth/login')
}

function signup(req, res) {
	res.render('auth/signup')
}

function post_signup(req, res) {
	let currentTime = new Date().getTime()
	user.insert({
		username: req.body.username,
		password: req.body.password,
		first_name: '',
		last_name: '',
		email: '',
		is_staff: '',
		is_active: '',
		is_superuser: '',
		last_login: currentTime,
		date_joined: currentTime
	}).then(function(user){
		res.redirect('/')
	})
}


module.exports = init