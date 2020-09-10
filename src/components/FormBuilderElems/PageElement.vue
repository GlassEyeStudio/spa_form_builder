<template>
  <div class="page">
    <h1 class="pageTitle">
      <input
        type="text"
        v-model="pageElem.title"
        :disabled="$store.state.selectedElem !== pageElem.uuid"
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
          @click="addNewSection(0, pageElem.uuid)"
          value="+SECTION"
        />
        <input
          type="button"
          @click="addNewQuestion(0, pageElem.uuid)"
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
        />
        <div class="centeredButtons">
          <input
            type="button"
            @click="addNewSection(index + 1, pageElem.uuid)"
            value="+SECTION"
          />
          <input
            type="button"
            @click="addNewQuestion(index + 1, pageElem.uuid)"
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
  import { Page, Question, Section } from "@/interfaces";
  import { v4 as uuidv4 } from "uuid";

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
  .page {
    margin: auto auto 28px;
    max-width: 1140px;

    .pageTitle {
      font-size: 1.5rem;
      margin: 22px 0;

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
