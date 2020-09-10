<template>
  <div
    :class="[
      'page',
      $store.state.selectedElem === pageElem.uuid ? 'selected' : ''
    ]"
  >
    <h1 class="pageTitle">
      <input
        type="text"
        v-model="pageElem.title"
        :disabled="$store.state.selectedElem !== pageElem.uuid"
      />
      <input
        class="danger"
        type="button"
        @click.stop="removeElement(pageElem.uuid, parentUuid)"
        value="REMOVE"
      />
    </h1>
    <div
      :class="[
        'content',
        $store.state.selectedElem === pageElem.uuid ? 'selected' : ''
      ]"
      @click.stop="$store.commit('setSelectedItem', pageElem.uuid)"
    >
      <div class="centeredButtons">
        <input
          type="button"
          @click="addNewElement('section', 0, pageElem.uuid)"
          value="+SECTION"
        />
        <input
          type="button"
          @click="addNewElement('question', 0, pageElem.uuid)"
          value="+QUESTION"
        />
      </div>
      <div
        class="pageElem"
        v-for="(item, index) in pageElem.items"
        :key="item.uuid"
      >
        <component
          v-bind:is="childComponent(item)"
          :itemElem="item"
          :uuid="item.uuid"
          :parentUuid="pageElem.uuid"
        />
        <div class="centeredButtons">
          <input
            type="button"
            @click="addNewElement('section', index + 1, pageElem.uuid)"
            value="+SECTION"
          />
          <input
            type="button"
            @click="addNewElement('question', index + 1, pageElem.uuid)"
            value="+QUESTION"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from "vue-property-decorator";
  import SectionElement from "@/components/FormBuilderElems/SectionElement.vue";
  import QuestionElement from "@/components/FormBuilderElems/QuestionElement.vue";
  import {
    addNewElement,
    Page,
    Question,
    Section,
    removeElement
  } from "@/interfaces";

  @Component({
    name: "PageElement",
    components: { SectionElement, QuestionElement }
  })
  export default class PageElement extends Vue {
    @Prop({ required: true })
    pageElem: Page | undefined;

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
  .page {
    margin: auto auto 28px;
    max-width: 1140px;

    .pageTitle {
      font-size: 1.5rem;
      margin: 22px 0;
      display: flex;
      justify-content: space-between;

      &:first-child {
        margin-top: 10px;
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
