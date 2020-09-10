<template>
  <div
    class="section"
    :class="$store.state.selectedElem === itemElem.uuid ? 'selected' : ''"
    @click.stop="$store.commit('setSelectedItem', itemElem.uuid)"
  >
    <h2 class="sectionTitle">
      <input
        type="text"
        v-model="itemElem.title"
        :disabled="$store.state.selectedElem !== itemElem.uuid"
      />
      <input
        class="danger"
        type="button"
        @click.stop="removeElement(itemElem.uuid, parentUuid)"
        value="REMOVE"
      />
    </h2>
    <div class="centeredButtons">
      <input
        type="button"
        @click="addNewElement('section', 0, itemElem.uuid)"
        value="+ NESTED SECTION"
      />
      <input
        type="button"
        @click="addNewElement('question', 0, itemElem.uuid)"
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
        :parentUuid="itemElem.uuid"
      />
      <div class="centeredButtons">
        <input
          type="button"
          @click="addNewElement('section', index + 1, itemElem.uuid)"
          value="+ SECTION"
        />
        <input
          type="button"
          @click="addNewElement('question', index + 1, itemElem.uuid)"
          value="+ QUESTION"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from "vue-property-decorator";
  import QuestionElement from "@/components/FormBuilderElems/QuestionElement.vue";
  import {
    Question,
    Section,
    addNewElement,
    removeElement
  } from "@/interfaces";

  @Component({
    name: "SectionElement",
    components: { QuestionElement }
  })
  export default class SectionElement extends Vue {
    @Prop({ required: true })
    itemElem: Section | undefined;

    @Prop({ required: true })
    parentUuid: string | undefined;

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

    addNewElement = (
      type: "page" | "section" | "question",
      position: number,
      parentUID: string
    ) => addNewElement(type, position, parentUID);

    removeElement = (elemUUID: string, parentUID: string) =>
      removeElement(elemUUID, parentUID);
  }
</script>

<style scoped lang="scss">
  .section {
    .sectionTitle {
      font-size: 1.25rem;
      display: flex;
      justify-content: space-between;
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
