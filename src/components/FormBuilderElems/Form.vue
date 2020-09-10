<template>
  <form>
    <component
      v-for="page in formElem.items"
      :key="page.uuid"
      v-bind:is="PageElem"
      :pageElem="page"
    />
  </form>
</template>

<script>
  import { Component, Vue } from "vue-property-decorator";
  import { v4 as uuidv4 } from "uuid";
  import PageElem from "@/components/FormBuilderElems/Page.vue";

  @Component({
    name: "Form",
    components: { PageElem },
    props: { formElem: {} }
  })
  export default class Form extends Vue {
    getNewUUID = () => uuidv4();
  }
</script>

<style scoped></style>
