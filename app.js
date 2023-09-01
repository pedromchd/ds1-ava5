const express = require('express');
const { engine } = require('express-handlebars');

const app = express();
const router = require('./routes/routes');

app.engine('.hbs', engine({ extname: '.hbs', defaultLayout: false }));
app.set('view engine', '.hbs');
app.set('views', './views');

app.use(router);

app.listen(3000, () => {
    console.log(`App listening on port 3000`);
});
