<template>
  <div class="page">
    <h1 v-html="pageElem.title" class="pageTitle" />
    <div class="content">
      <component
        v-for="item in pageElem.items"
        :key="item.uuid"
        v-bind:is="childComponent(item)"
        :itemElem="item"
        :uuid="item.uuid"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from "vue-property-decorator";
  import SectionElement from "@/components/FormBuilderElems/SectionElement.vue";
  import QuestionElement from "@/components/FormBuilderElems/QuestionElement.vue";
  import { Page, Question, Section } from "@/interfaces";

  @Component({
    name: "PageElement",
    components: { SectionElement, QuestionElement }
  })
  export default class PageElement extends Vue {
    @Prop({ required: true })
    pageElem: Page | undefined;

    childComponent(item: Section | Question) {
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

<style scoped lang="scss">
  .page {
    margin: auto auto 28px;
    max-width: 1140px;

    .pageTitle {
      font-size: 1.5rem;
      margin: 22px 0;

      &:first-child {
        margin-top: 0;
      }
    }

    .content {
      padding: 25px 40px;
      background: white;
      border: solid 1px #eee;
      border-radius: 10px;
    }
  }
</style>
