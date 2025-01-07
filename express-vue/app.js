require('dotenv').config();
const bodyParser = require("body-parser");
const express = require('express');
const app = express();
const port = process.env.PORT;
const cors = require('cors')
const routes = require('./routes/index.js');

require('./models/index.js')
app.use(cors())
app.use(bodyParser.json())


Object.values(routes).forEach((value) => {
    app.use(value);
});
// Object.values(routes).forEach((value) => {
//     if (typeof value === 'function' || (value && typeof value === 'object' && typeof value.handle === 'function')) {
//         app.use(value);
//     } else {
//         console.error('Invalid middleware or router:', value);
//     }
// })

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})