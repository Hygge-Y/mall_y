<template>
  <div id="category" ref="aaaa">
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
    <div class="content">
      <tab-menu :categories="categories"/>
                <!-- :@selectItem="selectItem"></tab-menu> -->

      <scroll id="tab-content" :data="[categoryData]">
        <div>
          <tab-content-category :subcategories="showSubcategory"></tab-content-category>
          <tab-control :titles="['综合', '新品', '销量']"
                       @itemClick="tabClick"></tab-control>
          <tab-content-detail :category-detail="showCategoryDetail"></tab-content-detail>
          <!-- <ul>
            <li>0</li>
            <li>0</li>
            <li>0</li>
            <li>0</li>
            <li>0</li>
            <li>0</li>
            <li>0</li>
            <li>0</li>
            <li>0</li>
            <li>0</li>
            <li>0</li>
            <li>0</li>
            <li>0</li>
            <li>0</li>
            <li>0</li>
            <li>0</li>
            <li>0</li>
            <li>0</li>
            <li>0</li>
            <li>0</li>
            <li>0</li>
            <li>0</li>
            <li>0</li>
            <li>0</li>
            <li>0</li>
            <li>0</li>
            <li>0</li>
            <li>0</li>
            <li>0</li>
            <li>0</li>
            <li>0</li>
            <li>0</li>
            <li>0</li><li>0</li>
            <li>0</li>
            <li>0</li>
            <li>0</li>
            <li>0</li>
            <li>0</li>
            <li>0</li>
            <li>0</li><li>0</li>
            <li>0</li>
            <li>0</li>
            <li>0</li>
            <li>0</li>
            <li>0</li>
            <li>0</li>
            <li>0</li>
            <li>0</li>
            <li>0</li>
            <li>0</li>
            <li>0</li>
            <li>0</li>
            <li>0</li>
            <li>0</li>
            <li>0</li>
            <li>0</li>
            <li>0</li>
            <li>0</li>
            <li>0</li>
            <li>0</li>

          </ul> -->
        </div>
      </scroll>
    </div>
      
      <!--1.无论是否设置click:false, button都可以点击-->
      <!-- <button @click="btnClick">按钮</button> -->

      <!--2.必须设置click:true, 那么div才能监听点击-->
      <!-- <div @click="divClick">呵呵呵呵</div> -->
    </div>

</template>

<script>
  import BScroll from 'better-scroll'
  import {getCategory, getSubcategory, getCategoryDetail } from "network/category"

  import GridView from 'components/common/gridView/GridView'
  import NavBar from 'components/common/navbar/NavBar'
  
  import {POP, SELL, NEW} from "@/common/const";
  import {backTopMixin} from 'common/mixin'
  import {tabControlMixin} from "@/common/mixin";
  
  import TabControl from 'components/content/tabControl/TabControl'
  import Scroll from 'components/common/scroll/Scroll'
  
  import TabMenu from './childComps/TabMenu'
  import TabContentCategory from './childComps/TabContentCategory'
  import TabContentDetail from './childComps/TabContentDetail'
  
  export default {
    name: "Category",
    mixins: [backTopMixin,tabControlMixin],
    components: {
		  NavBar,
      TabMenu,
      TabControl,
      Scroll,
      TabContentCategory,
      TabContentDetail
    },
    data() {
      return {
       categories: [],
        categoryData: {
        },
        currentIndex: -1
      }
    },
    created() {
		  // 1.请求分类数据
      this._getCategory()
    },
    computed: {
		  showSubcategory() {
		    if (this.currentIndex === -1) return {}
        return this.categoryData[this.currentIndex].subcategories
      },
      showCategoryDetail() {
		    if (this.currentIndex === -1) return []
		    return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
      }
    },
    
    // 组件创建完后调用
    mounted() {
      this.scroll = new BScroll(this.$refs.aaaa, {
        // probeType: 3,
        // pullUpLoad: true
      })

      this.scroll.on('scroll', (position) => {
        console.log(position);
      })

      this.scroll.on('pullingUp', () => {
        console.log('上拉加载更多');
      })
    },
   methods: {
		  _getCategory() {
		    getCategory().then(res => {
		      // 1.获取分类数据
		      this.categories = res.data.category.list
          // 2.初始化每个类别的子数据
          for (let i = 0; i < this.categories.length; i++) {
            this.categoryData[i] = {
              subcategories: {},
              categoryDetail: {
                'pop': [],
                'new': [],
                'sell': []
              }
            }
          }
          // 3.请求第一个分类的数据
          // this._getSubcategories(0)
            // this._getSubcategory(0)
        })
      }
  },
   _getSubcategories(index) {
        this.currentIndex = index;
		    const mailKey = this.categories[index].maitKey;
        getSubcategory(mailKey).then(res => {
          this.categoryData[index].subcategories = res.data
          this.categoryData = {...this.categoryData}
          this._getCategoryDetail(POP)
          this._getCategoryDetail(SELL)
          this._getCategoryDetail(NEW)
          // vm.$data._getCategoryDetail(POP)
        })
      },
      _getCategoryDetail(type) {
		    // 1.获取请求的miniWallkey
        const miniWallkey = this.categories[this.currentIndex].miniWallkey;
        // 2.发送请求,传入miniWallkey和type
		    getCategoryDetail(miniWallkey, type).then(res => {
		      // 3.将获取的数据保存下来
		      this.categoryData[this.currentIndex].categoryDetail[type] = res
          this.categoryData = {...this.categoryData}
        })
      },
      /**
       * 事件响应相关的方法
       */
      // selectItem(index) {
      //   this._getSubcategories(index)
      // }
    
}
  
</script>

<style scoped>
  #category {
    height: 300px;
    height: 100vh;
    overflow: hidden;
    /*overflow-y: scroll;*/
  }

  .nav-bar {
    background-color: #1A73E8;
    /* background-color: var(--color-tint); */
    font-weight: 700;
    color: #fff;
  }

  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;

    display: flex;
  }

  #tab-content {
    height: 100%;
    flex: 1;
  }
</style>