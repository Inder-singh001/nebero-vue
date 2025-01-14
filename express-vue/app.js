require('dotenv').config();
const bodyParser = require("body-parser");
const express = require('express');
const app = express();
const port = process.env.PORT;
const cors = require('cors')
const routes = require('./routes/index.js');
const {getLoginUser } = require('./models/user.js')

require('./models/index.js')
app.use(cors())
app.use(bodyParser.json())

// app.use('/', async (req, res, next) => {
//     let user = await getLoginUser(req)
//     if (user) {
//         next();
//     }
//     else {
//         return res.status(401).send({
//             status: false,
//             message: "Un-Authenticated"
//         })
//     }
// })


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