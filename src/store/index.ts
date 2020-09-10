import Vue from "vue";
import Vuex from "vuex";
import { Form, Page } from "@/interfaces";
import { v4 as uuidv4 } from "uuid";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentForm: null as null | Form
  },
  mutations: {
    createForm: state => {
      state.currentForm = {
        type: "form",
        uuid: uuidv4(),
        items: []
      };
    },
    addPageToForm: (state, item: { page: Page; atPosition: number }) => {
      state.currentForm?.items.splice(item.atPosition, 0, item.page);
    }
  },
  actions: {},
  modules: {}
});
