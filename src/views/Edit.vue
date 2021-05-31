<template>
  <div class="body">
    <!-- Modal Window Before Exit Editing -->
    <div id="before-leave">
      If you leave all unsaved progress will be lost
      <div>
        <button @click="leave()">
          <router-link to="/">Leave</router-link>
        </button>
        <button @click="stay()">Stay</button>
      </div>
    </div>
    <!-- End of the Modal Window Before Exit Editing -->

    <!-- Editing Mode -->
    <div v-if="routeId !== undefined" class="edit">
      <div class="edit_block">
        <!-- Modal Window Before Deleting Note -->
        <div v-if="newNote.delete">
          <h5>You sure want to delete this note?</h5>
          <button @click="yesDelete(routeId)">
            <router-link to="/">Yes</router-link>
          </button>
          <button @click="noDelete()">No</button>
        </div>
        <!-- End of the Modal Window Before Deleting Note -->

        <!-- Note Editing  -->
        <form>
          <h3 class="title">
            {{ todos[routeId].title }}
          </h3>
          <button
              class="delete-button"
              @click.prevent="deleteNote()"
            >Delete this Note
          </button>
          <div class="container">
            <div class="inner-container" v-for="(description, index) in newNote.desc" :key="index">
              <div v-if="!description.editing">
                <img
                  class="icon"
                  @click="editing(description,index)"
                  src="../img/icons/edit.svg"
                  height="16px"
                  alt
                />
                <label>
                  <input type="checkbox" :id="index" v-model="description.completed" />
                  <span class="description">{{index+1}}.) {{ description.name }}</span>
                </label>
                <img
                  class="icon icon-delete"
                  src="../img/icons/trash.svg"
                  height="16px"
                  @click="deleteItem(index)"
                />
              </div>
              <!-- Todo Editing -->
              <div v-else>
                <input
                  v-bind:id="'description' + index" 
                  @keyup.enter="description.editing = false"
                  @blur="description.editing = false"
                  type="text"
                  v-model="description.name"
                />
              </div>
              <!-- End of Todo Editing-->
            </div>
            <div>
              <button @click.prevent="switchAdding()">Add more todo</button>
            </div>
          </div>
        </form>
        <!-- End of Note Editing  -->

        <!-- New Todo Input-->
        <form class="add-form" v-if="isAdding">
          <div>
            <input class="newItem" type="text" v-model="newItem" />
            <button @click.prevent="addItem()">Add</button>
          </div>
        </form>
        <button class="save save-cancel" @click="saveEdited()">Save Editing</button>
        <button class="cancel save-cancel" @click="cancelEditing()">Cancel Editing</button>
        <!-- End of New Todo Input-->
      </div>
    </div>
    <!-- End of Editing Mode -->

    <!-- Creating New Note -->
    <div class="create-form" v-else>
      <form>
        <input id="title-in" class="title-input" type="text" placeholder="title" v-model="title" />
        <input class="todo-input" type="text" placeholder="todo" v-model="desc" />
        <div>
          <button type="submit" @click.prevent="saveNote()">Save Note</button>
          <button @click.prevent="addTodo()">Add Todo</button>
        </div>
      </form>
      <div v-if="note.title && note.desc" class="preview">
        <h2>{{ note.title }}</h2>
        <div v-for="(item, index) in note.desc" :key="index">
          <p>{{index+1}}.) {{ item.name }}</p>
        </div>
      </div>
    </div>
     <!-- End of Creating New Note-->
    <!-- Modal window when Note is saved -->
    <div id="success">
      <transition  name="fade">
        <p  class="success-save" v-if="saving">Successfully saved</p>
      </transition>
    </div>
    <!-- End Modal  -->
  </div>
 
</template>

<script>
import { mapState, mapMutations } from "vuex";
import deepClone from "clone-deep-js";
export default {
  data() {
    return {
      routeId: this.$route.params.id,
      title: "",
      desc: "",
      newItem: "",
      isEditing: false,
      isAdding: false,
      note: { title: "", desc: [], id: null },
      // creating new Object to avoid conflict while creating New Note
      newNote: { title: "", desc: [], id: null },
      //
      answear: false,
      saving: false,
      scrollPosition: 0,
    }
     
  },
  computed: {
    ...mapState(["todos"]),
  },
  methods: {
    ...mapMutations([
      // "addingItem",
      "deletingItem",
      "savingNote",
      "decline",
      "agree",
      "deletingNote",
      "spreading",
      "finalSaving",
    ]),
    addItem() {
      this.newItem.trim()
        ? this.newNote.desc.push({ name: this.newItem.trim() })
        : "";
      this.newItem = "";
    },
    deleteItem(index) {
      this.newNote.desc.splice(index, 1);
    },
    editing(desc) {
      desc.editing = true;
    },
    switchAdding() {
      this.isAdding = true;
    },
    modalSaving(){if (this.saving) {
        setTimeout(() => {
          this.saving = false
        }, 1000);
      }},
    saveNote() {
      if (this.title) {
         this.saving = true;
         this.scrollPosition = window.pageYOffset;
         document.getElementById("success").style.top = `${this.scrollPosition + 48}px`;
      }
      this.modalSaving()
      if (!this.note.title) {
        if (this.title || this.desc) {
          this.savingNote({
            title: this.title,
            desc: [{ name: this.desc }],
            id: this.todos.length,
            delete: false,
          });
          this.title = this.desc = "";
        }
      } else {
        this.savingNote(this.note);
        this.note = { title: "", desc: [], id: null };
        this.title = "";
        document.getElementById("title-in").removeAttribute("disabled");
      }
    },
    addTodo() {
      let title = document.getElementById("title-in");
      if (!this.note.title && this.desc) {
        this.note = {
          title: this.title,
          desc: [{ name: this.desc}],
          id: this.todos.length,
          delete: false,
        };
        this.desc = ""; 
        title.setAttribute("disabled", "disabled");
      } else if (this.desc !== "") {
        this.note.desc.push({ name: this.desc });
        this.desc = "";
        title.setAttribute("disabled", "disabled"); 
      }
      
    },
    noDelete() {
      this.newNote.delete = false;
    },
    yesDelete(index) {
      this.newNote = {};
      this.agree(index);
    },
    deleteNote() {
      this.newNote.delete = true;
    },
    leave() {
      this.answear = true;
    },
    stay() {
      this.answear = false;
      document.getElementById("before-leave").classList.remove("show");
    },
    cancelEditing() {
      this.newNote = deepClone(this.todos[this.routeId]);
    },
    //Difference between saveEdited() and "saveNote()" - the saveEdited  is changing the state Todos by replacing
    // the old  with new one. And save note() is just pushing it to the array of todos. 
    saveEdited() {
      this.finalSaving({
        routeId: this.routeId,
        editedObject: this.newNote,
      });
      this.saving = true;
      this.scrollPosition = window.pageYOffset;
      document.getElementById("success").style.top = `${this.scrollPosition + 48}px`;
      this.modalSaving();
    },
  },
  mounted() {
    this.answear = false;
    if (this.routeId !== undefined) {
      this.newNote = deepClone(this.todos[this.routeId]);
    }
  },
  beforeRouteLeave(to, from, next) {
    if (this.routeId == undefined) {
      if (this.note.title !== "") {
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
    } else {
        if (JSON.stringify(this.newNote.desc) !== JSON.stringify(this.todos[this.routeId].desc)) {
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
    }
  },
};
</script>

<style src="../styles/_edit.scss" lang="scss" scoped>

</style>