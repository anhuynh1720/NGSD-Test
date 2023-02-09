const express = require('express');
const app = express();

const router = require('./app/routes/router');

app.use("", router);

app.listen(5000, () => {
    console.log("Server has started on port 5000");
})