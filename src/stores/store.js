import Vue from 'vue';
import Vuex from 'vuex';
import baseModule from './modules/base';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    base: baseModule
  }
});