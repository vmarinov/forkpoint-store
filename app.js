const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
require('dotenv').config();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');

const session = require('express-session');
const cors = require('cors');
const uncapitalize = require('express-uncapitalize');
const categoryService = require('./components/categories/categoriesService');

const { findTopCategories } = categoryService;
const indexRouter = require('./routes/index');
const categoriesRouter = require('./routes/categories');
const productsRouter = require('./routes/products');

const app = express();

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// locals
app.locals.projectName = 'Forkpoint store';
app.locals.copyright = '© 2019 Forkpoint store, All Rights Reserved';

function setCategories(categories) {
  app.locals.menuItems = categories;
}

findTopCategories()
  .then((result) => setCategories(result))
  .catch((err) => {
    throw new Error(err);
  });


// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'assets')));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(cookieParser('61d333a8-6325-4506-96e7-a180035cc26f'));
app.use(
  session({
    secret: 'forkpoint training',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  }),
);
app.use(uncapitalize());
app.use(cors());

app.use('/', indexRouter);
app.use(categoriesRouter);
app.use(productsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// routes
app.get('/', indexRouter);
app.get('/categories', categoriesRouter);
app.get('/products', productsRouter);

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
