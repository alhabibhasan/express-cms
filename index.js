const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const portNumber = process.env.PORT;
const pageRouter = require('./routers/page');

app.use(bodyParser.json());
app.use('/pages', pageRouter);

app.get('/', function (req, res) {
    res.send("Hello world!");
});

app.listen(portNumber, () => console.log('Running on port ' + portNumber));