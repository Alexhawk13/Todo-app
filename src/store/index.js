import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: []
  },
  mutations: {
    updateTodos(state, newTodo) {
      state.todos.push(newTodo)
    }
  }
})




//  [{
//           desc: 'To do 1',
//           title: 'First Note'
//         },
//         {
//           desc: 'To do  2',
//           title: 'First Note'
//         },
//         {
//           desc: 'To do  3',
//           title: 'First Note'
//         },
//         {
//           desc: 'To do  4',
//           title: 'First Note'
//         }
//       ],
//       [{
//           desc: 'To do 5',
//           title: 'Second Note'
//         },
//         {
//           desc: 'To do 6',
//           title: 'Second Note'
//         },
//         {
//           desc: 'To do 7',
//           title: 'Second Note'
//         },
//         {
//           desc: 'To do 8',
//           title: 'Second Note'
//         }
//       ]