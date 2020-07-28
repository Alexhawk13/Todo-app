<template>
  <div>
    <router-link to="Edit"></router-link>
    <!-- <form @submit.prevent="updates()">
      <input id="title" type="text" v-model="title" />
      <input id="desc" type="text" v-model="todo" />
      <button type="sumbit">Enter</button>
    </form>-->
    <!-- Block iterations -->
    <div class="item" v-for="(todo,index) in todos" :key="index">
      <h2>{{todo.title}}</h2>
      <h3>{{todo.desc}}</h3>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      title: "",
      todo: "",
    };
  },
  computed: {
    ...mapState(["todos"]),
  },
  methods: {
    ...mapMutations(["updateTodos"]),
    updates() {
      this.updateTodos({ title: this.title, desc: this.todo });
    },
  },
};
</script>


<style lang="scss">
.item {
  border: 2px solid maroon;
  margin: 20px;
}
</style>