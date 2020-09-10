<template>
  <div
    class="section"
    :class="$store.state.selectedElem === itemElem.uuid ? 'selected' : ''"
    @click.stop="$store.commit('setSelectedItem', itemElem.uuid)"
  >
    <h2 class="pageTitle">
      <input
        type="text"
        v-model="itemElem.title"
        :disabled="$store.state.selectedElem !== itemElem.uuid"
      />
    </h2>
    <div class="centeredButtons">
      <input
        type="button"
        @click="addNewSection(0, itemElem.uuid)"
        value="+ NESTED SECTION"
      />
      <input
        type="button"
        @click="addNewQuestion(0, itemElem.uuid)"
        value="+ NESTED QUESTION"
      />
    </div>
    <div
      class="sectionInner"
      v-for="(item, index) in itemElem.items"
      :key="item.uuid"
    >
      <component
        v-bind:is="childComponent(item)"
        :itemElem="item"
        :uuid="item.uuid"
      />
      <div class="centeredButtons">
        <input
          type="button"
          @click="addNewSection(index + 1, itemElem.uuid)"
          value="+ SECTION"
        />
        <input
          type="button"
          @click="addNewQuestion(index + 1, itemElem.uuid)"
          value="+ QUESTION"
        />
      </div>
    </div>
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

    addNewSection(position: number, parentUID: string) {
      this.$store.commit("addElemToForm", {
        element: this.newSection(),
        atPosition: position,
        parentUUID: parentUID
      });
    }
    addNewQuestion(position: number, parentUID: string) {
      this.$store.commit("addElemToForm", {
        element: this.newQuestion(),
        atPosition: position,
        parentUUID: parentUID
      });
    }

    newSection() {
      return {
        type: "section",
        title: "New section",
        uuid: uuidv4(),
        items: []
      } as Section;
    }

    newQuestion() {
      return {
        type: "question",
        title: "New question",
        uuid: uuidv4(),
        // eslint-disable-next-line @typescript-eslint/camelcase
        response_type: "text"
      } as Question;
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
