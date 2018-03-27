<template>
  <div id="app">
    <!-- <img src="./assets/star.png"> -->
    <star-map></star-map>
  </div>
</template>

<script>
import StarMap from '@/components/StarMap'
export default {
  name: 'App',
  components: {
    StarMap
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
