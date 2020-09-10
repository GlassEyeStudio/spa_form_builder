import Vue from "vue";
import Vuex from "vuex";
import { Form } from "@/interfaces";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentForm: {} as Form
  },
  mutations: {
    updateForms: (state, form: Form) => {
      state.currentForm = form;
    }
  },
  actions: {},
  modules: {}
});
