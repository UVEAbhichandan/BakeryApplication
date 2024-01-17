const itemType ={
    CAKE: 'Cake',
    COOKIES: 'Cookies',
    MUFFINS:'Muffins'
}


const orderState = {
    CREATED:'Created',
    SHIPPED: 'Shipped',
    DELIVERED: 'Delivered',
    CANCELLED: 'Cancelled'
}


const filterTypes = {
    TIME: 'Time',
    ITEMTYPE : 'Item Type',
    ORDERSTATE: 'Order State',
    TOP5BRANCHES: 'Top 5 branches'
}


const dateFilters = {
    day: '24 Hours',
    sevenDays: '7 Days',
    month: '1 Month'
}


module.exports = {filterTypes, itemType, orderState, dateFilters}
