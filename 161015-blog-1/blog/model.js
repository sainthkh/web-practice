const db = require('../db').sqlite
const user = require('../auth').model

exports.get = function(slug, callback) {
	db.serialize(function(){
		db.get("select * from posts where slug=(?)", slug, function(err, post){
			if(!post) {
				callback({})
			} else {
				setup_post(post).then(function(post){
					callback(post)
				})
			}
		})
	})
}

exports.get_by_id = function(id, callback) {
	db.serialize(function(){
		db.get("select * from posts where id=(?)", id, function(err, post){
			setup_post(post).then(function(post){
				callback(post)
			})
		})
	})
}

exports.get_by_page = function(page, numberOfPostsInAPage, callback) {
	db.serialize(function(){
		db.all("select * from posts limit ?, ?", 
			(page - 1) * numberOfPostsInAPage, numberOfPostsInAPage, 
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

exports.insert = function(post) {
	return new Promise(function(resolve, reject){
		db.run("insert into posts values(NULL, $title, $slug, $user_id, $body, $publish, $created, $updated, $status)", {
			$title: post.title, 
			$slug: post.slug, 
			$user_id: post.author.id, 
			$body: post.body, 
			$publish: post.publish, 
			$created: post.created, 
			$updated: post.updated, 
			$status: post.status
		}, function(err){
			if(err) {
				console.error(err)
				reject(err)
			} else {
				resolve(post)
			} 
		})
	})
}

exports.update = function(post) {
	return new Promise(function(resolve, reject) {
		db.run("update posts set title = $title, slug = $slug, user_id = Suser_id, body = $body, publish = $publish, updated = $updated, status = $status) where id = $id", { 
			$id: post.id,
			$title: post.title, 
			$slug: post.slug, 
			$user_id: post.user_id, 
			$body: post.body, 
			$publish: post.publish, 
			$updated: post.updated, 
			$status: post.status
		}, function(err){
			if(err) reject(err)
			else resolve(post)
		})
	})
}

exports.remove = function(slug) {
	return new Promise(function(resolve, reject) {
		db.run("delete from posts where slug = ?", slug, function(err){
			if (err) reject(err)
			else resolve()
		})
	})
}