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
  div.selected {
    background: #e3e3e3 !important;
    > * > .centeredButtons,
    > .centeredButtons,
    &.question ~ .centeredButtons {
      display: block;
    }
  }
</style>
