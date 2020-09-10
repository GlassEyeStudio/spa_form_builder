<template>
  <div class="question">
    <label>
      {{ itemElem.title }}
      <select v-model="itemElem.response_type">
        <option>text</option>
        <option>number</option>
      </select>
    </label>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from "vue-property-decorator";
  import { Question } from "@/interfaces";

  @Component({
    name: "QuestionElement"
  })
  export default class QuestionElement extends Vue {
    @Prop({ required: true })
    itemElem: Question | undefined;
  }
</script>

<style scoped lang="scss">
  .question {
    line-height: 3rem;

    &:not(:first-child) {
      border-top: solid 1px #e3e3e3;
    }
    label {
      display: flex;
      justify-content: space-between;
      align-items: center;

      select {
        margin: 5px;
        padding: 7px 20px;
        background: #e3e3e3;
        border: none;
        border-radius: 5px;
      }
    }
  }
</style>
