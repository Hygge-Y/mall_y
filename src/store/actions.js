import {
    ADD_COUNTER,
    ADD_TO_CART
  } from './mutation-types'
  

const actions = {
    addCart(context, payload) {
       return new Promise((resolve, reject) => {
          //payload新添加的商品
        //数组常用的方法：push/pop/unshift/shift/sort/reverse/map/filter/reduce/join…
        // state.cartList.push(payload)
        //1.查找之前数组中是否有该商品
      let oldProduct = context.state.cartList.find(function (item) {
        return item.iid === payload.iid
      })
  
      //2.判断oldProduct
      if(oldProduct) {
        // let oldProduct = state.cartList[index]
        // oldProduct.count += 1
        context.commit(ADD_COUNTER, oldProduct)
        resolve ('当前商品数量+1')
      } else {
        payload.count = 1
        // context.state.cartList.push(payload)
        context.commit(ADD_TO_CART, payload)
        resolve ('添加了新的商品')

      }
       })
    }
}

export default actions
