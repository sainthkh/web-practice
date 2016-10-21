"use strict";

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const model = require('./model')

exports.init = function(app) {
	app.use(passport.initialize());
	app.use(passport.session());
}

exports.ensureAuthenticated = function(req, res, next) {
	if (req.isAuthenticated()) {
		return next()
	}
	res.redirect('/login')
};

exports.passport = passport

passport.serializeUser(function(user, done) {
	done(null, user.username);
});

passport.deserializeUser(function(username, done) {
	if (!username) done(null)

	model.get(username, function(err, user){
		done(null, user.username)
	})
});

passport.use(new LocalStrategy(
	function(username, password, done) {
		model.check_user_password(username, password)
		.then(result => {
			if(result) {
				done(null, { username: username })
			} else {
				done(null, false, "ID doesn't exist or password didn't match")
			}
		})
	}
))