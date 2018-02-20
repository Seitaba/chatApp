const express = require('express');
const path = require('path');
const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 8000;

var app = express();
app.use(express.static(publicPath));
app.listen(port, () => {
    console.log(`Server listen on port ${port}`);
});