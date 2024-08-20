
const express = require('express');
const cartRoutes = require('./cartRoutes/cartRoutes');
const dotenv = require('dotenv')

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/cart', cartRoutes);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
