<template>
  <!-- 根组件只包含一个 <router-view/>，用于显示匹配到的路由组件 -->
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
// 此处没有额外逻辑，主要用于路由组件的展示
export default {
  name: "App"
}
</script>

<style>
/* 全局样式可在此处编写 */
</style>
