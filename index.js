const express = require('express');
const bodyParser = require('body-parser');
const apiRouter = require('./routers/api');
const multer = require('multer');
const path = require('path');
const app = express();
const cors = require('cors');
const {startConcurrent} = require('./helpers/concurrent');

require('./config/db.config');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './public/dbimages')));

/*app.use(multer({
    dest: 'public/images'
}).single('image'));*/


const allowedOrigins = [
    'http://localhost:8081',
    'http://localhost:3000',
    'http://192.168.0.10:3000',
    'http://192.168.0.10:8081'
];


// Reflect the origin if it's in the allowed list or not defined (cURL, Postman, etc.)
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Origin not allowed by CORS'));
        }
    },
};

// Enable preflight requests for all routes
app.options('*', cors(corsOptions));


app.use('/api', cors(corsOptions), apiRouter);

app.listen(3001, () => {
    console.log('Server en puerto 3001');
});

startConcurrent();
