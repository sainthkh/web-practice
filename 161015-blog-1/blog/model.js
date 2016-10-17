var db = require('../db')

exports.get_post = function(slug, callback) {
	db.serialize(function(){
		db.get("select * from posts where slug=(?)", slug, function(err, post){
			db.get("select id, username from users where id=(?)", post.userid, function(err, user){
				post.user = user
				callback(post)
			})
		})
	})
}

exports.get_post_by_id = function(id, callback) {
	db.serialize(function(){
		db.get("select * from posts where id=(?)", id, function(err, post){
			db.get("select id, username from users where id=(?)", post.userid, function(err, user){
				post.user = user
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
				db.parallelize(function(){
					for(var i = 0; i < posts.length; i++) {
						db.get("select id, username from users where id=(?)", posts[i].userid, function(err, user){
							posts[i].user = user
						})
					}
				})
				callback(posts)
			}
		)
	})
}