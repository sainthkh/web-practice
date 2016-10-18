const model = require('./model')
const truncate = require('truncate')

function init(app) {
	app.get('/', main)
	app.get('/:slug', details)
	app.get('/admin/write', adminWrite)
}

function main(req, res) {
	model.get_posts_by_page(1, 5, function(posts){
		res.render('blog/home', {
			title: "My Blog",
			posts: posts.map(function(post){
				post.body = truncate(post.body, 200)
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

module.exports = init