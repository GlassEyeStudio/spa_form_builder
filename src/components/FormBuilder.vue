<template>
  <div class="formBuilder" v-if="$store.state.currentForm">
    <FormElement :form-elem="$store.state.currentForm" />
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import FormElement from "@/components/FormBuilderElems/FormElement.vue";
  import json from "@/assets/form.json";

  @Component({
    name: "FormBuilder",
    components: { FormElement }
  })
  export default class FormBuilder extends Vue {}
</script>

<style lang="scss">
  .centeredButtons {
    display: none;
    text-align: center;
    padding-left: 10%;
  }
  .danger {
    display: none;
  }

  div.selected {
    background: #e3e3e3 !important;
    > .sectionInner:last-of-type > .centeredButtons,
    > * > .danger,
    > .centeredButtons,
    > .danger,
    h1 > .danger,
    &.question ~ .centeredButtons,
    &.question ~ .danger {
      display: block;
      &.danger {
        display: inline-block;
        position: relative;
      }
    }
  }
</style>
