const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { errorHandler, errorConverter } = require('./midlwares/errors');
const blogRouter = require('./routes/blogroutes');
const config = require('./config/config');

mongoose
.connect(config.dbConnection)
.then(() => {
    console.log('connected to mongodb');
})
.catch((err) => {
    console.error(err);
});

app.use(express.json());
app.use(blogRouter);
app.use(errorHandler)
app.listen(3000, () => {
console.log('server listening on port 3000');
});
