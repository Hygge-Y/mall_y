<template>
   <div id="detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo"/>
    </scroll>
  </div>
</template>

<script>
    import DetailNavBar from './childComps/DetailNavBar'

export default {
    name: "Detail",
    components: {
        DetailNavBar,
    },
    data() {
        return {
            iid: null
        }
    },
    created() {
        this.iid = this.$route.params.iid
    }
}
</script>

<style scoped>

</style>