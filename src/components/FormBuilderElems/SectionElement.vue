<template>
  <div class="section">
    <component
      v-for="item in itemElem.items"
      :key="item.uuid"
      v-bind:is="childComponent(item)"
      :itemElem="item"
      :uuid="item.uuid"
    />
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from "vue-property-decorator";
  import QuestionElement from "@/components/FormBuilderElems/QuestionElement.vue";
  import { Section } from "@/interfaces";

  @Component({
    name: "SectionElement",
    components: { QuestionElement }
  })
  export default class SectionElement extends Vue {
    @Prop({ required: true })
    itemElem: Section;

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
