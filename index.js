const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const pageRouter = require('./routers/page');

let portNumber = 3000;
if (app.settings.env !== 'development') {
    portNumber = process.env.PORT;
}

app.use(bodyParser.json());

app.use('/api/pages', cors() , pageRouter);

app.get('/', function (req, res) {
    res.send("Hello world!");
});

app.listen(portNumber, () => console.log('Running on port ' + portNumber));