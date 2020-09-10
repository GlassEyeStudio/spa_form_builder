<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <span> {{ getNewUUID() }}</span>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import HelloWorld from "./components/HelloWorld.vue";
  import { v4 as uuidv4 } from "uuid";
  import json from "./assets/form.json";

  @Component({
    components: {
      HelloWorld
    }
  })
  export default class App extends Vue {
    getNewUUID = () => uuidv4();
  }
</script>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
