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

function setup_post(post) {
	return user.summary(post.userid).then(function(user){
		post.author = user
		return post
	})
}

exports.insert_post = function(post) {
	return new Promise(function(resolve, reject){
		db.run("insert into posts(title, slug, user_id, body, publish, created, updated, status) values($id, $title, $slug, Suser_id, $body, $publish, $created, $updated, $status)", {
			$title: post.title, 
			$slug: post.slug, 
			$user_id: post.user_id, 
			$body: post.body, 
			$publish: post.publish, 
			$created: post.created, 
			$updated: post.updated, 
			$status: post.status
		}, function(err){
			if(err) reject(err)
			else resolve(post)
		})
	})
}

exports.update_post = function(post) {
	return new Promise(function(resolve, reject) {
		db.run("update posts set title = $title, slug = $slug, user_id = Suser_id, body = $body, publish = $publish, updated = $updated, status = $status) where id = $id", { 
			$id: post.id,
			$title: post.title, 
			$slug: post.slug, 
			$user_id: post.user_id, 
			$body: post.body, 
			$publish: post.publish, 
			$created: post.created, 
			$updated: post.updated, 
			$status: post.status
		}, function(err){
			if(err) reject(err)
			else resolve(post)
		})
	})
}

exports.delete_post = function(slug) {
	return new Promise(function(resolve, reject) {
		db.run("delete from posts where slug = ?", slug, function(err){
			if (err) reject(err)
			else resolve()
		})
	})
}