const express = require('express');
const dotEnv = require("dotenv")
const mongoose = require("mongoose")
const vendorRoutes = require("./routes/vendorRoutes")
const bp = require("body-parser")
const firmRoutes = require('./routes/firmRoutes')
const productRoutes = require('./routes/productRoutes')
const cors = require('cors')
const path = require('path')

const app = express();
const PORT = process.env.PORT || 4000;


app.use(cors())
app.use(bp.json())
app.use('/vendor', vendorRoutes)
app.use('/firm', firmRoutes)
app.use('/product', productRoutes);
app.use('/uploads', express.static('uploads'))

dotEnv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => { console.log("DB connected Successfully..") })
    .catch((error) => console.log(error))


app.use('/home', (req, res) => {
    res.send("<h1>Welcome to Yaswanth");
})

app.listen(PORT, () => {
    console.log(`Server started and running at ${PORT}`)
})