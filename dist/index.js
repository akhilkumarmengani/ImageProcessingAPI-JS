"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var app = express_1.default();
// set the view engine to ejs
app.set('view engine', 'ejs');
// use res.render to load up an ejs view file
// index page
app.get('/', function (req, res) {
    res.render(path_1.default.join(__dirname + '/views/pages/index'));
});
// about page
app.get('/about', function (req, res) {
    res.render(path_1.default.join(__dirname + '/views/pages/about'));
});
app.listen(3000);
console.log('Server is listening on port 8080');
