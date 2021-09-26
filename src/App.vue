<template>
  <div class="content-app">
    <NavBar/>
    
    <div class="app-content"><router-view/></div>
  </div>
</template>

<script>

import NavBar from "./components/NavBar.vue"

export default {
  name: "App",
  components: {
    NavBar
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.app-content {
  margin: 50px;
  width: 100%;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.content-app {
  display: flex;
}
</style>
