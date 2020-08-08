<template>
  <div>
    <router-link to="edit"></router-link>
    <div class="item" v-for="(todo,index) in todos" :key="index">
      <form class="container">
        <!-- Dialog window -->
        <div v-if="todo.show">
          <h5>You sure want to delete this note?</h5>
          <button @click="yes(index)">Yes</button>
          <button @click="no(index)">No</button>
        </div>
        <!-- End of Dialog window -->
        <h2>{{todo.title}}</h2>
        <button class="delete-note" @click="deleteNote(index)">X</button>
        <label v-for="(description,index) in todo.desc" :key="index">
          <input disabled type="checkbox" :id="index" v-model="description.completed" />
          {{description.name}}
        </label>
        <router-link class="link" :to="{name : 'edit', params: {id:index}}">edit</router-link>
      </form>
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
    ...mapState(["todos", "answer", "show"]),
  },
  methods: {
    ...mapMutations(["deletingNote", "agree", "decline"]),
    deleteNote(index) {
      this.deletingNote(index);
    },
    yes(index) {
      this.agree(index);
      console.log(index);
    },
    no(index) {
      this.decline(index);
    },
  },
};
</script>


<style lang="scss" scoped>
.item {
  border: 2px solid maroon;
  margin: 20px;
}
.link {
  display: block;
}
.container {
  position: relative;
}
.delete-note {
  position: absolute;
  right: 0;
  top: -20px;
}
.modal {
  display: block;
}
.hide {
  display: none;
}
</style>