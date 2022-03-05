const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.get('/', (req, res) => {
    res.send('Hola mundo');
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.listen( 3000, () => {
    console.log('servidor arrancar');
});