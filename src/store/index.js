import Vue from 'vue'
import Vuex from 'vuex'
import {getData} from '../api'

Vue.use(Vuex);

export default () => {
  return new Vuex.Store({
    state: {
      preItems: []
    },
    mutations: {
      setItems(state, preItems) {
        state.preItems = preItems
      }
    },
    actions: {
      async getItems({ commit }) {
        let itemResult = await getData();  // http 的api
        itemResult = itemResult.data;
        let preItems = [];
        if(itemResult.code === 'A00000' && itemResult.data && itemResult.data.items) {
          preItems = itemResult.data.items;
          console.log(preItems);
          console.log('preItems', preItems.length);
        }
        commit('setItems', preItems)
      }
    }
  })
}
