<template>
  <form @submit.prevent="">
    <input
      class="newPageButton"
      type="button"
      @click="addNewElement('page', 0, formElem.uuid)"
      value="+ PAGE"
      v-if="!formElem.items || formElem.items.length === 0"
    />
    <div
      class="pageHandler"
      v-for="(item, index) in formElem.items"
      :key="item.uuid"
    >
      <component
        v-bind:is="pageNode"
        :pageElem="item"
        :uuid="item.uuid"
        :parentUuid="formElem.uuid"
      />
      <input
        type="button"
        @click="addNewElement('page', index + 1, formElem.uuid)"
        value="+ PAGE"
        class="newPageButton"
      />
    </div>
  </form>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from "vue-property-decorator";
  import PageElement from "@/components/FormBuilderElems/PageElement.vue";
  import { Form, addNewElement } from "@/interfaces";

  @Component({
    name: "FormElement",
    components: { PageElement }
  })
  export default class FormElement extends Vue {
    @Prop({ required: true })
    formElem: Form | undefined;

    pageNode = PageElement;

    addNewElement = (
      type: "page" | "section" | "question",
      position: number,
      parentUID: string
    ) => addNewElement(type, position, parentUID);
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
    display: block;
  }
</style>
