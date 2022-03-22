const express = require('express');
const bodyParser = require('body-parser');
const apiRouter = require('./routers/api');
const multer = require('multer');
const path = require('path');
const app = express();
const cors = require('cors');

require('./config/db.config');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './public/dbimages')));

/*app.use(multer({
    dest: 'public/images'
}).single('image'));*/


const allowedOrigins = [
    'http://localhost:8081'
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

// app.use(function(req, res, next) {
//     res.header("status", 200 );
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//     res.header("Access-Control-Allow-Credentials", "true");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Authorization, Content-Length, X-Requested-With, Accept, Origin, Cache-Control, Pragma, Expires, x-token");
//     next();
// });

app.use('/api', cors(corsOptions), apiRouter);

app.listen(3001, () => {
    console.log('servidor arranco correctamente');
});
