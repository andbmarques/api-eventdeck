const express = require('express');
const app = express();

const PORT = process.env.PORT || 4000;

const routes = require('./routes/user.route');

app.use("/user", routes);

app.get('/', (req, res) => {
    res.status(200).json({ msg: 'Hello world' })
})

app.listen(PORT, () => {
    console.log('Server running on PORT:' + PORT)
})