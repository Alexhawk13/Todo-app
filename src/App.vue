<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/edit">Create</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #35d0bbfa;
  // background-color: #24243c;
  //  background: rgb(24,4,23);
  // background: radial-gradient(circle, rgba(24,4,23,1) 0%, rgba(10,0,14,1) 25%, rgba(17,2,38,1) 50%, rgba(1,4,171,1) 75%, rgba(2,43,52,1) 100%);
  min-height: 100vh;
}
body {
  margin: 0;
  padding: 0;
}
.home {
  padding-top: 10%;
  background: rgb(24,4,23);
  background: radial-gradient(circle, rgba(24,4,23,1) 0%, rgba(10,0,14,1) 25%, rgba(17,2,38,1) 50%, rgba(1,4,171,1) 75%, rgba(2,43,52,1) 100%);
}
#nav {
  padding: 30px 0px;
  background-color: black;
  position: fixed;
  width: 100%;
  z-index: 2;
  a {
    font-weight: bold;
    color: #318faa;

    &.router-link-exact-active {
      color: #34c9df;
    }
  }
}
</style>
