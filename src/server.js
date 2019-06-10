const history = require('connect-history-api-fallback');
const express = require('express');
const app = express();


const PORT = 8080;

app.use(history({
    verbose: true
}));

app.use(express.static('./dist'));

app.listen(PORT, function () {
    console.info(`app serving on port ${PORT}!`)
});
