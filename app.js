const express = require('express');
const { engine } = require('express-handlebars');
const router = require('./routes/router');

const app = express();

app.engine('.hbs', engine({ extname: '.hbs', defaultLayout: false }));
app.set('view engine', '.hbs');
app.set('views', './views');

app.use(router);

app.listen(3000, () => {
    console.log(`App listening on port 3000`);
});
