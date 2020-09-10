<template>
  <div id="app">
    <h1>Welcome to form builder!</h1>
    <div class="actionButtons">
      <input type="button" value="Create new form" @click="createNewForm" />
      <label>
        Import Existing file:
        <input type="file" value="Import" v-on:change="readFromFile" />
      </label>
      <input
        type="button"
        value="Save to json file"
        @click.stop="saveToFile"
        v-if="$store.state.currentForm != null"
      />
    </div>
    <FormBuilder />
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import FormBuilder from "@/components/FormBuilder.vue";
  import { Form } from "@/interfaces";

  @Component({
    components: {
      FormBuilder
    }
  })
  export default class App extends Vue {
    createNewForm() {
      this.$store.commit("createForm");
    }

    saveToFile() {
      const a = document.createElement("a");
      const file = new Blob(
        [JSON.stringify(this.$store.state.currentForm, null, 1)],
        {
          type: "text/json"
        }
      );
      a.href = URL.createObjectURL(file);
      a.download = "form.json";
      a.click();
    }

    readFromFile(e: Event) {
      const files = (e.target as HTMLInputElement).files || null;
      if (files) {
        if (!files[0]) return;
        const fr = new FileReader();
        fr.onload = e =>
          this.$store.commit(
            "loadForm",
            JSON.parse(e.target?.result as string) as Form
          );

        fr.readAsText(files[0]);
      }
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

    h1 {
      text-align: center;
    }

    .actionButtons {
      display: flex;
      justify-content: space-between;
    }
  }

  input[type="button"] {
    background: #42b983;
    padding: 10px 20px;
    color: white;
    text-transform: uppercase;
    border: none;
    border-radius: 5px;
    margin: 10px auto;
    transition: background-color 0.3s;
    cursor: pointer;

    &:hover {
      background: #1c4c39;
    }
  }

  input[type="text"] {
    background: transparent;
    border: none;
    padding: 10px 0;
    display: block;
    font-size: inherit;
    font-weight: inherit;
    width: 100%;
  }
</style>
