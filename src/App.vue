<template>
  <div id="app">
    <!-- <img src="./assets/star.png"> -->
    <star-map></star-map>
    <star-point></star-point>
  </div>
</template>

<script>
import StarMap from '@/components/StarMap'
import StarPoint from '@/components/StarPoint'

export default {
  name: 'App',
  components: {
    StarMap,
    StarPoint
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
html,body {
  height: 100%;
  background: radial-gradient(#bea5db, #fff);
}
#app {
  font-family: Lato, PingFang SC, Microsoft YaHei, Arial, sans-serif;
  text-align: center;
  color: #8e71c7;
}
</style>
