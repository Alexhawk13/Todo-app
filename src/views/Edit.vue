<template>
  <div>
    <!-- Modal Window Before Exit -->
    <div id="before-leave">
      If you leave all unsaved progress will be lost
      <div>
        <button @click="leave()">
          <router-link to="/">Leave</router-link>
        </button>
        <button @click="stay()">Stay</button>
      </div>
    </div>
    <!-- End of the Modal Window Before Exit -->

    <!-- Editing Mode -->
    <div v-if="routeId !== undefined" class="edit">
      <div class="block">
        <!-- Modal Window Before Deleting Note -->
        <div v-if="todos[routeId].show">
          <h5>You sure want to delete this note?</h5>
          <button @click="yes(routeId)">
            <router-link to="/">Yes</router-link>
          </button>
          <button @click="no(routeId)">No</button>
        </div>
        <!-- End of the Modal Window Before Deleting Note -->

        <!-- Note Editing   -->
        <form>
          <h3 class="title">
            {{todos[routeId].title}}
            <button
              class="delete-button"
              @click="deleteNote(routeId)"
            >Delete this Note</button>
          </h3>

          <div class="container">
            <label v-for="(description,index) in todos[routeId].desc" :key="index">
              <div v-if="!description.editing">
                <img @click="editing(description)" src="../img/icons/edit.svg" height="20px" alt />
                <input type="checkbox" :id="index" v-model="description.completed" />
                {{description.name}}
                <img
                  src="../img/icons/trash.svg"
                  height="20px"
                  @click="deleteItem(index)"
                />
              </div>
              <!-- Todo Editing -->
              <div v-else>
                <input type="checkbox" :id="index" v-model="description.completed" />
                <input
                  v-bind:id="'hey'+ index"
                  @keyup.enter="description.editing = false"
                  @blur="description.editing = false"
                  type="text"
                  v-model="description.name"
                />
              </div>
              <!-- End of Todo Editing-->
            </label>
            <div>
              <button @click="adding()">add more todo</button>
            </div>
          </div>
        </form>
        <!-- End of Note Editing  -->

        <!-- New Todo Input-->
        <form class="add-form" v-if="isAdding">
          <div>
            <input type="text" v-model="newItem" />
            <button @click="addItem()">Save</button>
          </div>
        </form>
        <!-- End of New Todo Input-->
      </div>
    </div>
    <!-- End of Editing Mode -->

    <!-- Creating New Note Mode-->
    <div class="create-form" v-else>
      <form>
        <input id="title-in" class="title-input" type="text" placeholder="title" v-model="title" />
        <input class="todo-input" type="text" placeholder="todo" v-model="desc" />
        <div>
          <button type="submit" @click.prevent="saveNote()">Save Note</button>
          <button @click="addTodo()">Add Todo</button>
        </div>
      </form>
      <div class="preview">
        <h3>{{obj.title}}</h3>
        <div v-for="(item, index) in obj.desc " :key="index">
          <p>{{item.name}}</p>
        </div>
      </div>
    </div>
  </div>
  <!-- End of Creating New Note Mode-->
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      routeId: this.$route.params.id,
      title: "",
      desc: "",
      newItem: "",
      isEditing: false,
      isAdding: false,
      obj: { title: "", desc: [], id: null },
      answear: false,
    };
  },
  computed: {
    ...mapState(["todos"]),
  },
  methods: {
    ...mapMutations([
      "addingItem",
      "deletingItem",
      "savingNote",
      "decline",
      "agree",
      "deletingNote",
    ]),
    addItem() {
      this.newItem.trim() ? this.addingItem({ name: `${this.newItem}` }) : "";
      this.newItem = "";
    },
    deleteItem(index) {
      this.deletingItem(index);
    },
    editing(desc) {
      desc.editing = true;
    },
    adding() {
      this.isAdding = true;
    },
    saveNote() {
      if (!this.obj.title) {
        if (this.title || this.desc) {
          this.savingNote({
            title: this.title,
            desc: [{ name: this.desc }],
            id: this.todos.length,
            show: false,
          });
          this.title = this.desc = "";
        }
      } else {
        this.savingNote(this.obj);
        this.obj = { title: "", desc: [], id: null };
        this.title = "";
        document.getElementById("title-in").removeAttribute("disabled");
      }
    },
    addTodo() {
      if (!this.obj.title) {
        this.obj = {
          title: this.title,
          desc: [{ name: this.desc }],
          id: this.todos.length,
          show: false,
        };
      } else if (this.desc !== "") {
        this.obj.desc.push({ name: this.desc });
      }
      this.desc = "";
      document.getElementById("title-in").setAttribute("disabled", "disabled");
    },
    no(index) {
      this.decline(index);
    },
    yes(index) {
      this.agree(index);
    },
    deleteNote(index) {
      this.deletingNote(index);
    },
    leave() {
      this.answear = true;
    },
    stay() {
      this.answear = false;
      document.getElementById("before-leave").classList.remove("show");
    },
  },
  mounted() {
    this.answear = false;
  },
  beforeRouteLeave(to, from, next) {
    if (this.obj.title !== "") {
      document.getElementById("before-leave").classList.add("show");
      setTimeout(() => {
        if (this.answear === false) {
          next(false);
        } else {
          next();
        }
      }, 0);
    } else {
      next();
    }
  },
};
</script>

<style src= "../styles/_edit.scss" lang="scss" >
</style>