<template>
  <div class="body">
    <div class="item" v-for="(todo,index) in todos" :key="index">
      <form class="item__container">
        <!-- Dialog window -->
        <div v-if="todo.delete">
          <h5>You sure want to delete this note?</h5>
          <button @click.prevent="yes(index)">Yes</button>
          <button @click.prevent="no(index)">No</button>
        </div>
        <!-- End of Dialog window -->
        <h3 class="title">{{todo.title}}</h3>
        <button class="delete-note" @click.prevent="deleteNote(index)">X</button>
        <label
          :class="{lineThrough: description.completed}"
          v-for="(description,index) in todo.desc"
          :key="index"
        >
          <input disabled type="checkbox" :id="index" v-model="description.completed" />
          {{description.name}}
        </label>
        <router-link class="link" :to="{name : 'edit', params: {id:index}}">Edit</router-link>
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
    ...mapState(["todos"]),
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


<style src="../styles/_todoBlock.scss" lang="scss" scoped>
</style>