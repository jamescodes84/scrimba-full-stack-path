import { itemsBoughtArr } from '/itemsBoughtArr.js'

function calculateTotalCost(itemsBoughtArr){
/*
Challenge:
1. Use the reduce method to calculate the total 
   cost of items which have been bought.
*/  let runningAmount = 0
    const total = itemsBoughtArr.reduce((runningAmount, currentItem)=>{
        runningAmount += currentItem.priceUSD
        return runningAmount
    })
    return total
}

console.log(calculateTotalCost(itemsBoughtArr))