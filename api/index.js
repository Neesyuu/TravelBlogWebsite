const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRouter = require('./routes/productRoutes');
const cookieParser = require('cookie-parser');
const { checkUser } = require('./middleware/authMiddleware');

require('dotenv').config();
const app = express();

const port = 3000;

mongoose.connect(process.env.DBURI).catch((err)=>console.log(err));

app.use(cors());
app.use(express.json());
app.use(express.static('/public'));
app.use(cookieParser())
app.use(checkUser);

app.use(productRouter);

app.listen(port, ()=>{
    console.log(`Exapmle app listening on port http://localhost:${port}/`)
})