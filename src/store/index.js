import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: [{
      title: 'First Title',
      desc: [{
        name: 'First description',
        completed: false,
        editing: false
      }],
      id: 0,
      completed: false,
      show: false,
    }, {
      title: 'Second Title',
      desc: [{
        name: 'Second description',
        completed: false,
        editing: false
      }, {
        name: 'Third Description',
        editing: false,
        completed: false
      }],
      id: 1,
      completed: false,
      show: false,
    }],
  },

  mutations: {
    addingItem(state, newItem) {
      state.todos[router.currentRoute.params.id].desc.push(newItem);
    },
    deletingItem(state, index) {
      state.todos[router.currentRoute.params.id].desc.splice(index, 1)
    },
    savingNote(state, object) {
      state.todos.push(object)
    },
    deletingNote(state, index) {
      // console.log(index);
      state.todos[index].show = true;
    },
    decline(state, index) {
      state.todos[index].show = false;
      // state.answer = false;
    },
    agree(state, index) {
      state.todos[index].show = false;
      state.todos.splice(index, 1);
      // state.answer = true;
    },
  }
})