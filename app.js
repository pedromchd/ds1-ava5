const express = require('express');
const app = express();
const router = require('./routes/routes');

app.use(router);

app.listen(3000, () => {
    console.log(`App listening on port 3000`);
});
