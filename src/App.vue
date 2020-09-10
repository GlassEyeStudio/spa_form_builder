<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <FormBuilder />
    <span> {{ getNewUUID() }}</span>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import { v4 as uuidv4 } from "uuid";
  import FormBuilder from "@/components/FormBuilder.vue";

  @Component({
    components: {
      FormBuilder
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
