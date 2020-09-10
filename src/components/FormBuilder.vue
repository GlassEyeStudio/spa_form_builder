<template>
  <div class="formBuilder">
    <FormElement :form-elem="formElement" />
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import FormElement from "@/components/FormBuilderElems/FormElement";
  import json from "@/assets/form.json";
  import { Form } from "@/interfaces";

  @Component({
    name: "FormBuilder",
    components: { FormElement }
  })
  export default class FormBuilder extends Vue {
    formElement = json;
  }
</script>

<style scoped></style>
