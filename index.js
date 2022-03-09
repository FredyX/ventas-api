const express = require('express');
const bodyParser = require('body-parser');
const apiRouter = require('./routers/api');
const app = express();

require('./config/db.config');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api',apiRouter);
app.listen( 3000, () => {
    console.log('servidor arranco correctamente');
});
