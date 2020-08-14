<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style src="../src/static/fontawesome/css/all.min.css" ></style>
<style lang="scss" src="../src/global/css/global.scss"></style>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
