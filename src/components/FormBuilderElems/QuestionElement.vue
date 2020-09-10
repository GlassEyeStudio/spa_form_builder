<template>
  <div class="question">
    {{ itemElem.responseType }}
    {{ itemElem.uuid }}
    {{ itemElem.title }}
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

<style scoped></style>
