const express = require('express');
const bodyParser = require('body-parser');
const apiRouter = require('./routers/api');
const multer = require('multer');
const app = express();

require('./config/db.config');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(multer({
	dest: 'public/images'
}).single('image'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/api',apiRouter);
app.listen( 3001, () => {
    console.log('servidor arranco correctamente');
});
