<template>
   <div id="detail">
    <detail-nav-bar @titleClick="titleClick" ref="nav"/>
    <scroll class="content" 
            ref="scroll" 
            :probe-type="3" 
            @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>
    <!-- <back-top @click.native="backClick"/> -->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>

  </div>
</template>

<script>
    import DetailNavBar from './childComps/DetailNavBar'
    import DetailSwiper from './childComps/DetailSwiper'
    import DetailBaseInfo from './childComps/DetailBaseInfo'
    import DetailShopInfo from './childComps/DetailShopInfo'
    import DetailGoodsInfo from './childComps/DetailGoodsInfo'
    import DetailParamInfo from './childComps/DetailParamInfo'
    import DetailCommentInfo from './childComps/DetailCommentInfo'
    import DetailBottomBar from './childComps/DetailBottomBar'


    import Scroll from 'components/common/scroll/Scroll'
    import GoodsList from 'components/content/goods/GoodsList'

    import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail';
    import {debouce} from 'common/utils'
    import {itemListenerMixin, backTopMixin} from 'common/mixin'
    import {BACK_POSITION} from "common/const";

    export default {
      name: "Detail",
      components: {
            DetailNavBar,
            DetailSwiper,
            DetailBaseInfo,
            DetailShopInfo,
            DetailGoodsInfo,
            DetailParamInfo,
            DetailCommentInfo,
            GoodsList,
            DetailBottomBar,
            // BackTop,
            Scroll
        },
      mixins: [itemListenerMixin, backTopMixin],
      data() {
        return {
            iid: null,
            topImages: [],
            goods: {},
            shop: {},
            detailInfo: {},
            paramInfo: {},
            commentInfo: {},
            recommends: [],
            themeTopYs: [],
            getThemeTopY: null,
            currentIndex: 0,
            // isShowBackTop: false,

            // itemImgListener: null
        }
    },
      created() {
        //1.保存传入的iid
        this.iid = this.$route.params.iid

        //2.根据iid请求详情数据
        getDetail(this.iid).then(res => {
        console.log(res);
            // 1.获取数据
            const data = res.result;
            // 2.获取顶部的图片轮播数据
            this.topImages = data.itemInfo.topImages
            // 3.获取商品信息
            this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
            // 4.创建店铺信息的对象
            this.shop = new Shop(data.shopInfo)
            // 5.保存商品的详情数据
            this.detailInfo = data.detailInfo;
            // 6.获取参数的信息
            this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
            // 7.获取评论信息
            if (data.rate.list) {
            this.commentInfo = data.rate.list[0];
          }

          this.$nextTick(() => {
            //更具最新的数据，对应的DOM是已经被渲染出来
            //但是图片依然是没有被加载完（目前获取到的offsetTop不包含其中的图片）
            //offsetTop值不对的时候，都是因为图片的问题
              //  this.themeTopYs = []
              //  this.themeTopYs.push(0);
              //  this.themeTopYs.push(this.$refs.params.$el.offsetTop);
              //  this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
              //  this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
          })
        })
        
        //3.请求推荐数据
        getRecommend().then(res => {
          // console.log(res);
          this.recommends = res.data.list
        })
        //4.给getThemeTop赋值(对给this.themeTopYs赋值的操作进行防抖)
        this.getThemeTopY = debouce(() => {
           this.themeTopYs = []
           this.themeTopYs.push(0);
           this.themeTopYs.push(this.$refs.params.$el.offsetTop);
           this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
           this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
           this.themeTopYs.push(Number.MAX_VALUE)

           console.log(this.themeTopYs);
        },1000)
        
        
    },
    // mounted() {
    // },
    // updated() {
    // },
      destroyed() {
        this.$bus.$off('itemImgLoad', this.itemImgListener)
      },
    methods: {
      imageLoad() {
        const refresh = debouce(this.$refs.scroll.refresh, 100)
        this.refresh()
        // this.$refs.scroll.refresh()

        this.getThemeTopY()

        // this.themeTopYs = []
        //        this.themeTopYs.push(0);
        //        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        //        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        //        this.themeTopYs
      },
      titleClick(index) {
        // console.log(index);
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
      },
      contentScroll(position) {
        // console.log(position);
        //1.获取y值
        const positionY = -position.y

        //2.positionY和主题中值进行对比

        // console.log(Number.MAX_VALUE);
        let length = this.themeTopYs.length
        for(let i = 0; i < length-1; i++) {
          // console.log(i+1); // str 3+1=31
          // if (positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) {
            // console.log(i);
            // if (this.currentIndex !==i && ())
            //hack做法:
            if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] 
            && positionY < this.themeTopYs[i+1])) {
               this.currentIndex = i;
               this.$refs.nav.currentIndex = this.currentIndex;
            }
            //普通做法:
            // if (this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY <
            //     this.themeTopYs[i+1]) || (i === length - 1 && positionY >= this.themeTopYs[i]))) {
            //   this.currentIndex = i;
            //   // console.log(this.currentIndex);
            //   this.$refs.nav.currentIndex = this.currentIndex;
            }

             // 1.判断BackTop是否显示
            this.listenShowBackTop(position)
          },
          // demo() {
          //   this.isShowBackTop = (-position.y) > BACK_POSITION;
          // }
        
          // backClick() {
          //     this.$refs.scroll.scrollTo(0, 0, 300)
          // },


      addToCart() {
          // console.log('----');
          //1.获取购物车需要展示的商品信息
          const itemInfo = {}
          itemInfo.image = this.topImages[0];
          itemInfo.title = this.goods.title;
          itemInfo.desc = this.goods.desc;
          itemInfo.price = this.goods.realPrice;
          itemInfo.iid = this.iid;
          // product.image = this.topImages[0];
          // product.title = this.goods.title;
          // product.desc = this.goods.desc;
          // product.price = this.goods.realPrice;
          // product.iid = this.iid;

          //2.将商品添加到购物车里
          // this.$store.commit('addCart',product)
          this.$store.dispatch('addCart', itemInfo)
          }
        }
  }
    


</script>

<style scoped>
    #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    /* 视口高度 */
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
      /* calc计算 */
    height: calc(100% - 44px);
  }
</style>