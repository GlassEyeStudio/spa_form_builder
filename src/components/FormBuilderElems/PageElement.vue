<template>
  <div class="page">
    <component
      v-for="item in pageElem.items"
      :key="item.uuid"
      v-bind:is="childComponent(item)"
      :itemElem="item"
      :uuid="item.uuid"
    />
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from "vue-property-decorator";
  import SectionElement from "@/components/FormBuilderElems/SectionElement.vue";
  import QuestionElement from "@/components/FormBuilderElems/QuestionElement.vue";
  import { Page } from "@/interfaces";

  @Component({
    name: "PageElement",
    components: { SectionElement, QuestionElement }
  })
  export default class PageElement extends Vue {
    @Prop({ required: true })
    pageElem: Page;

    childComponent(item) {
      switch (item.type) {
        case "section":
          return SectionElement;
        case "question":
          return QuestionElement;
        default:
          return null;
      }
    }
  }
</script>

<style scoped></style>
