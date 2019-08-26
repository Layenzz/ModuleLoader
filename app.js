require('./global.js');

const config = require("./config/config.json");
const bodyParser = require("body-parser");

const express = require("express");
require('express-group-routes');
require('express-group-routes');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


require('./routes.js')(app);
  
app.listen(global.PORT, () => {
    global.debug('SERVER', "The server is open on port " + global.PORT);
});
  