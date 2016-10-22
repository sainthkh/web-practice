"use strict";

const moment = require('moment')

const model = require('./model')
const auth = require('../auth')
const user = auth.model

const truncate = require('truncate')

function init(app) {
	app.get('/', main)
	app.get('/:slug', details)
	app.get('/admin/write', auth.required, adminWrite)
	app.post('/admin/write', auth.required, post_adminWrite)
}

function main(req, res) {
	model.get_by_page(1, 5, function(posts){
		res.render('blog/home', {
			title: "My Blog",
			posts: posts.map(function(post){
				post.body = truncate(post.body, 200)
				post.publish = moment(post.publish).format("MMM Do, YYYY")	
				return post
			})
		})
	})
}

function details(req, res) {
	
}

function adminWrite(req, res) {
	res.render('blog/admin-write')
}

function post_adminWrite(req, res) {
	user.get_user_id_by_username(req.body.author_name, function(err, user_id){
		let currentTime = new Date().getTime() 
		let post = {
			title: req.body.title,
			slug: req.body.slug,
			author: { id: user_id, username: req.body.author_name },
			body: req.body.content,
			created: currentTime,
			updated: currentTime,
			publish: currentTime,
			status: req.body.status
		}

		model.insert(post).then(function(post){
			res.render('blog/admin-write', {
				title: post.title,
				slug: post.slug,
				author: post.author,
				content: post.body,
				publish: post.publish
			})
		})
	})
}

module.exports = init