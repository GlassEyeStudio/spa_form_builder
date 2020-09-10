<template>
  <form>
    <input
      class="newPageButton"
      type="button"
      @click="addNewPage(0, formElem.uuid)"
      value="+ PAGE"
      v-if="!formElem.items || formElem.items.length === 0"
    />
    <div
      class="pageHandler"
      v-for="(item, index) in formElem.items"
      :key="item.uuid"
    >
      <component v-bind:is="pageNode" :pageElem="item" :uuid="item.uuid" />
      <input
        type="button"
        @click="addNewPage(index + 1, formElem.uuid)"
        value="+ PAGE"
        class="newPageButton"
      />
    </div>
  </form>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from "vue-property-decorator";
  import PageElement from "@/components/FormBuilderElems/PageElement.vue";
  import { Form, Page } from "@/interfaces";
  import { v4 as uuidv4 } from "uuid";

  @Component({
    name: "FormElement",
    components: { PageElement }
  })
  export default class FormElement extends Vue {
    @Prop({ required: true })
    formElem: Form | undefined;

    pageNode = PageElement;

    addNewPage(position: number, parentUID: string) {
      this.$store.commit("addElemToForm", {
        element: this.newPage(),
        atPosition: position,
        parentUUID: parentUID
      });
    }
    newPage() {
      return {
        type: "page",
        title: "New page " + this.formElem?.items.length,
        uuid: uuidv4(),
        items: []
      } as Page;
    }
  }
</script>

<style scoped>
  form {
    display: block;
    width: 100%;
    min-height: 80vh;
  }
  .newPageButton {
    margin: auto;
    display: inline-block;
  }
</style>
