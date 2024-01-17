const { itemType, filterTypes, orderState } = require("../constants");


const removeDuplicates =(data, key)=> {
    return [...new Map(data?.map((x) => [key(x), x])).values()];
}


const getType = (type)=>{
    switch(type){
        case 'Item Type':
            return 'itemType'
        case 'Order State':
            return 'orderState'
        default:
            return ''
    }
}


const getTypeChart = (orderList, type)=>{
    const column =  new Array(type === filterTypes.ORDERSTATE ? 4 : 3).fill(0);
    const categories = type === filterTypes.ORDERSTATE ? Object.values(orderState) : Object.values(itemType);
    for(const key in orderList) {
        const item = orderList[key];
        column[categories.indexOf(type === filterTypes.ITEMTYPE ? item.itemType : item.orderState)] ++
    }
    return {column, categories}
}


const getTopBranches = (orderList)=>{
    const bIdCounts = {};
    for (const key in orderList) {
        const bId = orderList[key].bId;
        bIdCounts[bId] = (bIdCounts[bId] || 0) + 1;
    }    
    const column =  new Array(Object.keys(bIdCounts).length).fill(0);
    const bIdArray = Object.entries(bIdCounts).map(([bId, count]) => ({ bId, count }));
    bIdArray.sort((a, b) => b.count - a.count);
    const top5BIds = bIdArray.slice(0, bIdArray.length < 6 ? bIdArray.length : 5).map(entry => entry.bId);
    for(const key in orderList) {
        const item = orderList[key];
        column[top5BIds.indexOf(item.bId)] ++
    }
    return {column, categories: top5BIds}
}


module.exports = {removeDuplicates, getType, getTypeChart, getTopBranches}
