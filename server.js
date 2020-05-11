const forceSecure = require("force-secure-express");
const express = require('express');
const path = require('path');

const app = express();

app.use(forceSecure([
    "soundspark.herokuapp.com"
]));

app.use(express.static(__dirname + '/dist/soundspark-front'));

app.get('/*', function(req,res) {

    res.sendFile(path.join(__dirname+'/dist/soundspark-front/index.html'));
});

app.listen(process.env.PORT || 8080);
