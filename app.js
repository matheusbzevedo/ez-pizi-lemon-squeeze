require('dotenv').config();

const createError = require('http-errors'),
    express = require('express'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    logger = require('morgan'),
    sassMiddleware = require('node-sass-middleware'),
    compression = require('compression'),
    session = require('express-session');

const appRoutes = require('./routes'),
    apiRoutes = require('./routes/api');

app = express();

app
.use(compression())
.set('views', path.join(__dirname, 'views'))
.set('view engine', 'ejs');

app.use(logger('dev'))
.use(express.json())
.use(express.urlencoded({ extended: false }))
.use(cookieParser())
.use(sassMiddleware({
    src: path.join(__dirname, 'public/styles/scss'),
    dest: path.join(__dirname, 'public/styles/css'),
    indentedSyntax: false,
    sourceMap: false,
    outputStyle: 'compressed',
    prefix: '/styles/css',
    debug: false
}))
.use(express.static(path.join(__dirname, 'public')))
.use(session({
    secret: 'topzera1',
    proxy: true,
    resave: true,
    saveUninitialized: true
}))
.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    response.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

appRoutes(app);
apiRoutes(app);

app.use((req, res, next) => next(createError(404)));

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500).render('error');
});

module.exports = app;