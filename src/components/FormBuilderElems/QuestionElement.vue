<template>
  <div class="question">
    {{ itemElem.title }}
    {{ itemElem.response_type }}
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
    itemElem: Question;
  }
</script>

<style scoped lang="scss">
  .question {
    line-height: 3rem;

    &:not(:first-child) {
      border-top: solid 1px #e3e3e3;
    }
  }
</style>
