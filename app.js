const express = require('express');
const { engine } = require('express-handlebars');
const handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const session = require('express-session');
const flash = require('connect-flash');
const router = require('./routes/router');
const sequelize = require('./config/database');

sequelize.sync();

const app = express();

app.use(session({
    secret: 'A1B2C3D4E5',
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
    handlebars: allowInsecurePrototypeAccess(handlebars)
}));
app.set('view engine', '.hbs');
app.set('views', './views');

app.use(express.static('./public'));

app.use(router);

app.listen(3000, () => {
    console.log(`App listening on port 3000`);
});
