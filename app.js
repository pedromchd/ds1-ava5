require('dotenv').config();
const express = require('express');
const { engine } = require('express-handlebars');
const handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const session = require('express-session');
const flash = require('connect-flash');
const router = require('./routes/router');
const sequelize = require('./config/database');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '127.0.0.1';

sequelize.sync();

const app = express();

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true
}));

app.use(flash());
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.errors = req.session.errors;
    next();
});

app.engine('.hbs', engine({ 
    extname: '.hbs', 
    defaultLayout: false, 
    handlebars: allowInsecurePrototypeAccess(handlebars)
}));
app.set('view engine', '.hbs');
app.set('views', './views');

app.use(router);

app.listen(PORT, HOST, () => {
    console.log(`App listening on http://${HOST}:${PORT}`);
});
