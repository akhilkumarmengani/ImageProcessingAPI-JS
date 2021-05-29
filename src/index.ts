import express from 'express';
import path from 'path';
import routes from './routes/index';
import logger from './middleware/logger';



const app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.set('views', path.resolve(__dirname, 'views'));

// use res.render to load up an ejs view file

// index page
// app.get('/', function(req, res) {
//   res.render(path.join(__dirname+'/views/index'));
// });

// resize page
// app.get('/resize', function(req, res) {
//   res.render(path.join(__dirname+'/views/index'));
// });

app.use('/',logger,routes);

app.listen(3000);
console.log('Server is listening on port 8080');