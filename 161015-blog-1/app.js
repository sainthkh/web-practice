const path = require('path')

const exphbs = require('express-handlebars')
const express = require('express');
const bodyparser = require('body-parser')

const app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname));

app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

var hbs = exphbs.create({
	defaultLayout: 'layout',
	extname: '.hbs',
	layoutsDir: path.join(__dirname),
	partialsDir: path.join(__dirname)
})

app.engine('.hbs', hbs.engine)
app.set('view engine', '.hbs')

require('./auth').init(app)
require('./blog').init(app)

app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});
