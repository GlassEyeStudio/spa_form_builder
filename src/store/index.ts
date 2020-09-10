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
    loadForm: (state, inputForm: Form) => {
      state.currentForm = inputForm;
    },
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
        }
      }
      state.selectedElem = item.element.uuid;
    },

    removeElementFromForm: (
      state,
      item: {
        elemUUID: string;
        parentUUID: string;
      }
    ) => {
      const update = () => (obj: Page | Section) => {
        if (obj.uuid === item.parentUUID) {
          obj.items.splice(
            obj.items.findIndex(i => i.uuid === item.elemUUID),
            1
          );
        } else if (obj.items)
          (obj.items.filter(i => i.type === "section") as Section[]).forEach(
            update()
          );
      };

      if (state.currentForm?.items) {
        if (
          state.currentForm.items.length > 0 &&
          item.parentUUID !== state.currentForm?.uuid
        ) {
          state.currentForm.items.forEach(update());
        } else if (item.parentUUID === state.currentForm?.uuid) {
          state.currentForm.items.splice(
            state.currentForm.items.findIndex(i => i.uuid === item.elemUUID),
            1
          );
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
