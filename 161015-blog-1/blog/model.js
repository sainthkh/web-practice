var db = require('../db')

exports.get_post = function(slug, callback) {
	db.serialize(function(){
		db.get("select * from posts where slug=(?)", slug, function(err, post){
			setup_post(post).then(function(post){
				callback(post)
			})
		})
	})
}

exports.get_post_by_id = function(id, callback) {
	db.serialize(function(){
		db.get("select * from posts where id=(?)", id, function(err, post){
			setup_post(post).then(function(post){
				callback(post)
			})
		})
	})
}

exports.get_posts_by_page = function(page, numberOfPostsInAPage, callback) {
	db.serialize(function(){
		db.all("select * from posts limit ?, ?", 
			numberOfPostsInAPage, (page - 1) * numberOfPostsInAPage, 
			function(err, posts){
				Promise.all(posts.map(function(post){
					return setup_post(post)
				})).then(function(posts){
					callback(posts)
				})
			}
		)
	})
}

function user_summary(id) {
	return new Promise(function(resolve, reject){
		db.get("select id, username from users where id=(?)", id, function(err, user){
			if (err) reject(err)
			resolve(user)
		})
	})
}

function setup_post(post) {
	return user_summary(post.userid).then(function(user){
		post.author = user
		return post
	})
}