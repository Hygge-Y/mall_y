<template>
  <div>
    <scroll class="content">
      <ul>
        <li>8</li>
        <li>8</li>
        <li>8</li>
        <li>8</li>
        <li>8</li>
        <li>8</li>
        <li>8</li>
        <li>8</li>
        <li>8</li>
        <li>8</li>
        <li>8</li>
        <li>8</li>
        <li>8</li>
        <li>8</li>
        <li>8</li>
        <li>8</li>
        <li>8</li>
        <li>8</li>
        <li>8</li>
        <li>8</li>
        <li>8</li>
        <li>8</li>
        <li>8</li>
        <li>8</li>
        <li>8</li>
        <li>8</li>
        <li>8</li>
        <li>8</li>
      </ul>
    </scroll>
  </div>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'


  export default {
    name: "Profile",
    components: {
      Scroll
    }
  }
</script>

<style scoped>
  .content {
    height: 300px;
    background-color: red;
    overflow: hidden;
  }
</style>
