<template>
  <form>
    <component
      v-for="item in formElem.items"
      :key="item.uuid"
      v-bind:is="pageNode"
      :pageElem="item"
      :uuid="item.uuid"
    />
  </form>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from "vue-property-decorator";
  import PageElement from "@/components/FormBuilderElems/PageElement.vue";
  import { Form } from "@/interfaces";

  @Component({
    name: "FormElement",
    components: { PageElement }
  })
  export default class FormElement extends Vue {
    @Prop({ required: true })
    formElem: Form;

    pageNode = PageElement;
  }
</script>

<style scoped></style>
