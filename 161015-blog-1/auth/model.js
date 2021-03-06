const db = require('../db').sqlite

exports.get = function(username, callback) {
	db.serialize(function(){
		db.get('select * from users where username = ?', username, function(err, user){
			callback(err, user)
		})
	})
}

exports.get_user_id_by_username = function(username, callback) {
	db.serialize(function(){
		db.get("select rowid from users where username = ?", username, function(err, user){
			callback(err, user.rowid)
		})
	})
}

exports.summary = function(id) {
	return new Promise(function(resolve, reject){
		db.get("select id, username from users where id=(?)", id, function(err, user){
			if (err) reject(err)
			resolve(user)
		})
	})
}

exports.check_user_password = function(username, password) {
	return new Promise(function(resolve, reject) {
		db.get("select password from users where username = ?", username, (err, user) => {
			if (err) {
				console.err(err)
				reject(err)
			} else {
				if (user.password == password) {
					resolve(true)
				} else {
					resolve(false)
				}
			}
		})
	})
}

exports.insert = function(user) {
	return new Promise(function(resolve, reject) {
		db.run("insert into users " +
			"values(NULL, $username, $first_name, $last_name, $email, $password, $is_staff, $is_active, $is_superuser, $last_login, $date_joined)", 
			{
				$username: user.username,
				$first_name: user.first_name,
				$last_name: user.last_name,
				$email: user.email,
				$password: user.password,
				$is_staff: user.is_staff,
				$is_active: user.is_active,
				$is_superuser: user.is_superuser,
				$last_login: user.last_login,
				$date_joined: user.date_joined
			}, function(err) {
				if (err) {
					console.error(err)
					reject(err)
				} else {
					resolve(user)
				}
			}
		)
	})
}

exports.update = function(user) {
	return new Promise(function(resolve, reject) {
		db.run("update users set username = $username, first_name = $first_name, last_name = $last_name, email = $email, password = $password, is_staff = $is_staff, is_active = $is_active, is_superuser = $is_superuser where id = $id", 
			{
				$id: user.id,
				$username: user.username,
				$first_name: user.first_name,
				$last_name: user.last_name,
				$email: user.email,
				$password: user.password,
				$is_staff: user.is_staff,
				$is_active: user.is_active,
				$is_superuser: user.is_superuser
			}, function(err) {
				if (err) reject(err)
				else resolve()
			}
		)
	})
}

exports.remove = function(id) {
	return new Promise(function(resolve, reject) {
		db.run("delete from users where id = ?", id, function(err){
			if (err) reject(err)
			else resolve()
		})
	})
}