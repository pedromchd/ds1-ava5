require('dotenv').config();
const express = require('express');
const { engine } = require('express-handlebars');
const handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const session = require('express-session');
const router = require('./routes/router');
const sequelize = require('./config/database');

sequelize.sync();

const app = express();

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true
}));

app.engine('.hbs', engine({ 
    extname: '.hbs', 
    defaultLayout: false, 
    handlebars: allowInsecurePrototypeAccess(handlebars)
}));
app.set('view engine', '.hbs');
app.set('views', './views');

app.use(router);

app.listen(3000, () => {
    console.log(`App listening on port 3000`);
});
