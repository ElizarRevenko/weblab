'use strict';

const express = require("express");
const http = require('http');
const historyport = 3000;
const historyhost = 'localhost';
const historypath = '/history';
const stateport = 3002;
const statehost = 'localhost';
const statepath = '/state';
const app = express();

app.use("/core", function (req, res) {
    //res.redirect(307, httphistory);
    //res.redirect(307, httpstate);
    var historyoption = {
        host: historyhost,
        port: historyport,
        path: historypath,
        method: 'POST',
        headers: req.headers
    };
    var stateoption = {
        host: statehost,
        port: stateport,
        path: statepath,
        method: 'PUT',
        headers: req.headers
    };
    if (req.method == 'DELETE') {
        stateoption.method = 'DELETE'
        
    } else {
        const reqhistory = http.request(historyoption, (resp) => {
        });
        reqhistory.on('error', (e) => {
            console.error(`problem with history request: ${e.message}`);
        });
        reqhistory.end();
    }
    const reqstate = http.request(stateoption, (resp) => {
    });
    reqstate.on('error', (e) => {
        console.error(`problem with state request: ${e.message}`);
    });
    reqstate.end();
    res.sendStatus(200);
});

app.listen(3001, function () {
    console.log("Server waiting connection...");
});