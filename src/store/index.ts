import Vue from "vue";
import Vuex from "vuex";
import { Form, Page, Question, Section } from "@/interfaces";
import { v4 as uuidv4 } from "uuid";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentForm: null as null | Form,
    selectedElem: "" as string
  },
  mutations: {
    createForm: state => {
      state.currentForm = {
        type: "form",
        uuid: uuidv4(),
        items: []
      };
    },
    addElemToForm: (
      state,
      item: {
        element: Page | Section | Question;
        atPosition: number;
        parentUUID: string;
      }
    ) => {
      const update = () => (obj: Page | Section) => {
        if (obj.uuid === item.parentUUID) {
          obj.items.splice(item.atPosition, 0, item.element);
          state.selectedElem = item.element.uuid;
        } else if (obj.items)
          (obj.items.filter(i => i.type === "section") as Section[]).forEach(
            update()
          );
      };

      if (state.currentForm?.items) {
        if (
          state.currentForm.items.length > 0 &&
          item.parentUUID !== state.currentForm?.uuid
        )
          state.currentForm.items.forEach(update());
        else if (item.element.type === "page") {
          state.currentForm.items.splice(
            item.atPosition,
            0,
            item.element as Page
          );
          state.selectedElem = item.element.uuid;
        }
      }
    },
    setSelectedItem(state, selectedUUID: string) {
      state.selectedElem = selectedUUID;
    }
  },
  actions: {},
  modules: {}
});
