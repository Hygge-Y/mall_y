import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'


const mutations ={
   //mutations唯一的目的就是修改state中状态
    //mutations中每个方法尽可能完成的事情比较单一
    [ADD_COUNTER](state, payload) {
      payload.count++
      // state.payload.count++
    },
    [ADD_TO_CART](state,payload) {
      payload.checked = true
      state.cartList.push(payload)
    }



  // addCart(state, info) {
  //   console.log(info);
  //   // 1.查看是否添加过
  //   const oldInfo = state.cartList.find(item => item.iid === info.iid)

  //   // 2.+1或者新添加
  //   if (oldInfo) {
  //     oldInfo.count += 1
  //   } else {
  //     info.count = 1
  //     info.checked = true
  //     state.cartList.push(info)
  //   }
  // }
}







export default mutations

