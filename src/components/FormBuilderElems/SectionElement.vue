<template>
  <div class="section">
    <h2 v-html="itemElem.title" class="sectionTitle" />
    <component
      v-for="item in itemElem.items"
      :key="item.uuid"
      v-bind:is="childComponent(item)"
      :itemElem="item"
      :uuid="item.uuid"
    />
    <input type="button" @click="addNewSection" value="Add Section" />
    <input type="button" @click="addNewQuestion" value="Add question" />
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from "vue-property-decorator";
  import QuestionElement from "@/components/FormBuilderElems/QuestionElement.vue";
  import { Question, Section } from "@/interfaces";
  import { v4 as uuidv4 } from "uuid";

  @Component({
    name: "SectionElement",
    components: { QuestionElement }
  })
  export default class SectionElement extends Vue {
    @Prop({ required: true })
    itemElem: Section | undefined;

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

    addNewSection() {
      const newSection = {
        type: "section",
        title: "New section",
        uuid: uuidv4(),
        items: []
      } as Section;
      this.$store.commit("addElemToForm", {
        element: newSection,
        atPosition: this.itemElem?.items.length,
        parentUUID: this.itemElem?.uuid
      });
    }

    addNewQuestion() {
      const newSection = {
        type: "question",
        title: "New question",
        uuid: uuidv4(),
        // eslint-disable-next-line @typescript-eslint/camelcase
        response_type: "text"
      } as Question;
      this.$store.commit("addElemToForm", {
        element: newSection,
        atPosition: this.itemElem?.items.length,
        parentUUID: this.itemElem?.uuid
      });
    }
  }
</script>

<style scoped lang="scss">
  .section {
    .sectionTitle {
      font-size: 1.25rem;
    }

    &:not(:first-child) {
      border-top: solid 1px #e3e3e3;
    }

    .section,
    .question {
      margin-left: 10%;
    }
  }
</style>
