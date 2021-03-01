<template>
<div class="cart-list">
  <scroll class="content" ref="scroll">
      <cart-list-item v-for="item in cartList" :key="item.iid" :item-info="item"></cart-list-item>
      <!-- <cart-list-item v-for="item in cartList" :key="item.iid" :item-info="item"></cart-list-item> -->
  </scroll>
  
</div>
  
</template>

<script>
  import {mapGetters} from 'vuex'
  import Scroll from 'components/common/scroll/Scroll'
  import CartListItem from './CartListItem'

	export default {
		name: "CartList",
    components: {
		  Scroll, CartListItem
    },
    computed: {
       ...mapGetters(['cartList'])
    },
    // props: {
		//   cartList: {
		//     type: Array,
    //     default() {
		//       return []
    //     }
    //   }
    // }
    activated() {
      this.$refs.scroll.refresh()
    }
	}
</script>

<style scoped>
  .cart-list {
    height: (100% - 44px);
  }
  .content {
    height: calc(100% - 44px - 49px);
    overflow: hidden;
  }
</style>
