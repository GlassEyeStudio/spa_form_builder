<template>
  <div id="app">
    <input type="button" value="Create new form" @click="createNewForm" />
    <input type="button" value="Import existing form" />
    <FormBuilder />
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

    createNewForm() {
      this.$store.commit("createForm");
    }
  }
</script>

<style lang="scss">
  @import url("https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap");

  body,
  html {
    padding: 0;
    margin: 0;
  }
  #app {
    font-family: "Nunito", Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    padding: 40px;
    color: #7c7c7c;
    background: #f8f8f8;
    height: 100%;
    min-height: calc(100vh - 80px);
  }
  input[type="button"] {
    background: #42b983;
    padding: 10px 20px;
    color: white;
    text-transform: uppercase;
    border: none;
    border-radius: 5px;
    margin: 0 10px;
    transition: background-color 0.3s;
    cursor: pointer;

    &:hover {
      background: #1c4c39;
    }
  }
</style>
