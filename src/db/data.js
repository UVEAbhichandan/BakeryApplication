const orderList = {
    '123': {
        itemType: 'cake',
        orderState: 'created',
        lastUpdateTime: '10pm',
        bId: '123',
        cId: '123',
        price: '500'
    },
    '124': {
        itemType: 'Cookies',
        orderState: 'delivered',
        lastUpdateTime: '10pm',
        bId: '123',
        cId: '123',
        price: '200'
    }
}
let lastOrderId = 124
module.exports = {orderList, lastOrderId}

// order: {
//     Item type : Cake, Cookies, Muffins
// • Order State : Created, Shipped, Delivered, Canceled
// • Last update time
// • Branch :BRANCHID
// • Customer :cid
// }

// PRICE: {
//     Cake : Rs 500
// • Cookies : Rs 50
// • Muffins : Rs 100
// }

