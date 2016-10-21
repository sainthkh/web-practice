"use strict";

const user = require('./model')
const util = require('./util')

function init(app) {
	util.init(app)

	app.get('/login', login)
	app.post('/login', post_login)
	app.get('/signup', signup)
	app.post('/signup', post_signup)
	app.get('/logout', logout)
}

function login(req, res) {
	res.render('auth/login')
}

function post_login(req, res, next) {
	util.passport.authenticate('local', {
		successRedirect: '/',              // SUCCESS: Go to home page
		failureRedirect: '/login', // FAIL: Go to /user/login
	})(req, res, next)
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

function logout(req, res) {
	req.logout()
	res.redirect('/')
}


module.exports = init