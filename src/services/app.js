// app.js

const express = require('express');
const { orderList, lastOrderId } = require('../db/data');
const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

app.get('/api/orders', (req, res) => {
  const responseData = {
    message: 'success',
    data: orderList
  };
  res.json(responseData);
});

app.get('/api/order/:orderId', (req, res) => {
  const orderId = parseInt(req.params.orderId);
  const order = orderList[orderId]
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  res.json(order);
});

app.post('/api/orders', (req, res) => {
  const { itemType, orderState, lastUpdateTime, bId, cId, price } = req.body;
  let orderId = lastOrderId

  if (!itemType || !orderState || !bId || !cId || !price) {
    return res.status(400).json({ error: 'Please enter required details.' });
  }
  const obj = {
    itemType,
    orderState,
    lastUpdateTime,
    bId,
    cId,
    price
  }
  // if(orderList[orderId]){
  //   orderList[orderId] = obj
  // }else{
    orderId = orderId+1
    orderList[orderId]= obj
  // }
  // lastOrderId++;
  res.status(201).json({ orderId: orderId });
});



// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
