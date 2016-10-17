var fs = require('fs')
var db = require('./init')

fs.readFile('./db/sql/1.sql', function(err, data){
	if (err) return console.error(err)
	db.serialize(function(){
		db.exec(data.toString())	
	})
})

