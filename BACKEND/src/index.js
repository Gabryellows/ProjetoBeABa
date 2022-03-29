const cors = require('cors');
const express = require('express');
const app = express();
const person = require('./route/person');
const adresse = require ('./route/adresse');
const payment = require ('./route/payment');
const shopcart = require ('./route/shopcart');
const shopcartproduct = require ('./route/shopcartproduct');
const product = require('./route/product');
const categorie = require('./route/categories');
const provider = require('./route/provider');



app.use(express.json());
app.use(cors());
app.use('/person', person);
app.use('/adresse', adresse);
app.use('/payment', payment);
app.use('/shopcart', shopcart);
app.use('/shopcartproduct', shopcartproduct);
app.use('/product', product);
app.use('/categories', categorie);
app.use('/providers', provider);

app.listen(3333, () => console.log('🌌 Server started at http://localhost:3333 🌌'));

