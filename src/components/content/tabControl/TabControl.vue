<template>
  <div class="tab-control">
    <div v-for="(item, index) in titles"
         class="tab-control-item"
         :class="{active: index === currentIndex}"
         @click="itemClick(index)" :key="item">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    props: {
      titles: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        currentIndex: 0  //记录当前谁被选中
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index;
        //$emit自定义事件，内部往外传
        this.$emit('tabClick', index)
      }
    }
  }
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
  }

  .tab-control-item {
    flex: 1;
  }

  .tab-control-item span {
    padding: 5px;
  }

  .active {
     color: #1A73E8
    /* color: var(--color-high-text); */
  }

  .active span {
    border-bottom: 3px solid #1A73E8;
    /* border-bottom: 3px solid var(--color-tint); */
  }
</style>
