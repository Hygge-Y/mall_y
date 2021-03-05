const getters = {
  cartLength(state) {
    return state.cartList.length
  },
  cartList(state) {
    return state.cartList
  }
  // cartCount---cartLength(state, getters) {
  //   return getters.cartList.length
  // }
}

export default getters
