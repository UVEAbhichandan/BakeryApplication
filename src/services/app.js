// app.js


const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const { filterTypes } = require('../constants');
const { removeDuplicates, getTypeChart, getTopBranches } = require('../helper');
app.use(cors()); // Enable CORS for all routes
app.use(express.json());
let orderList = {}
let lastOrderId = 124


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
  orderId = orderId+1
  orderList[orderId]= obj
  lastOrderId++;


  res.status(201).json({ orderId: orderId });
});


app.post('/api/chart', (req, res) => {
  const { type, filter } = req.body;
  const filteredData = {};
  const data = [];
  let options = {
    chart: {
      id: "task-chart",
    },
    xaxis: {
      categories: [],
    },
  };
  let series = [
    {
      type: "column",
      name: "No. of Orders",
      data: [],
    },
  ];
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - (filter ? Number(filter) : 7));


  for (const key in orderList) {
    const item = orderList[key];
    const itemDate = new Date(item.lastUpdateTime);


    if (currentDate <= itemDate) {
      filteredData[key] = item;
    }
  }
  if(!(type === filterTypes.TIME || !type)){
    let data = {}
    if(type === filterTypes.TOP5BRANCHES){
      data = getTopBranches(filteredData)
    }else {
      data = getTypeChart(filteredData, type)
    }
    series[0].data = data.column;
    options.xaxis.categories= data.categories;
  }
  Object.keys(filteredData).forEach((item) => {
    data.push(filteredData[item])
  })
  if (type === filterTypes.TIME || !type) {
    const lastXDays = removeDuplicates(data, (it) => it.lastUpdateTime);
    const row = lastXDays?.map((ele) => {
      return ele.lastUpdateTime;
    });
    let column = Array(lastXDays.length).fill(0);
    data?.forEach((ele, index) => {
      if (row.includes(ele.lastUpdateTime)) {
        column[row.indexOf(ele.lastUpdateTime)]++;
      }
    });
    series[0].data = column;
    options.xaxis.categories= row;
  }
  res.status(201).json({ series, options });
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
