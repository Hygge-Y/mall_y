<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :goods-item="item" :key="item"/>
  </div>
</template>

<script>
  import GoodsListItem from './GoodsListItem'

  export default {
    name: "GoodsList",
    components: {
      GoodsListItem
    },
    props: {
      goods: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .goods {
    display: flex;
    /* 根据宽度放置item */
    flex-wrap: wrap; 
    /* 均等分放置 */
    justify-content: space-evenly;
    /* justify-content: space-around; */
    padding: 2px;
  }


</style>
