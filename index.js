const express = require('express');
const app = express();
require('dotenv').config();
const http = require('http').createServer(app);
const cors = require("cors");
const helmet = require("helmet");
const { dbConnect } = require('./src/config/database');
var io = require('socket.io')(http, {
    cors: {
      origins: ['http://localhost:4200']
    }
  });
const { socketConnect } = require("./src/config/socket")

const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended : false}));

const accessDomain = "http://localhost:5000/";
const corsOptions = {
    origin: accessDomain.includes(',') ? accessDomain.split(',') : accessDomain,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS']
};
app.use(cors(corsOptions));
app.use(helmet());

dbConnect();
socketConnect( io);

app.get('/', (req, res) => {
    res.status(200).send({
        error: false,
        status: 200,
        message: "Node Setup is done!!"
    })
});
 
try {
    require('./routes')(app, http);
} catch (err) {
    console.log('Error in Routing Connection', err);
}

app.all('*', (req, res) => {
    res.send({
        error: true,
        status: 404,
        message: "API not found"
    })
});

http.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})