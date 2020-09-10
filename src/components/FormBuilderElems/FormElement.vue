<template>
  <form>
    <component
      v-for="item in formElem.items"
      :key="item.uuid"
      v-bind:is="pageNode"
      :pageElem="item"
      :uuid="item.uuid"
    />
    <input type="button" @click="addNewPage" value="+" />
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

    addNewPage() {
      const newPage = {
        type: "page",
        title: "New page" + this.formElem?.items.length,
        uuid: uuidv4(),
        items: []
      } as Page;
      this.$store.commit("addElemToForm", {
        element: newPage,
        atPosition: this.formElem?.items.length,
        parentUUID: this.formElem?.uuid
      });
    }
  }
</script>

<style scoped></style>
