function init(app) {
	app.get('/', main)
}

function main(req, res) {
	res.render('blog/home', {
		title: "My Blog"
	})
}

module.exports = init