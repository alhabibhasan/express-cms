const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const portNumber = 3000;
const pageRouter = require('./routers/page').router;

app.use(bodyParser.json());
app.use('/pages', pageRouter);

app.get('/', function (req, res) {
    res.send("Hello world!");
});

app.listen(portNumber, () => console.log('Running on port ' + portNumber));