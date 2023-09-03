const express = require('express');
const { engine } = require('express-handlebars');
const handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const router = require('./routes/router');
const sequelize = require('./config/database');

sequelize.sync();

const app = express();

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
