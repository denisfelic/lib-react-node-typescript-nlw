"use strict";
exports.__esModule = true;
var express_1 = require("express");
var app = express_1["default"]();
app.get('/', function () { return '<h1>Oi</h1>'; });
app.listen(3333);
