<template>
  <div class="home">
    <Create></Create>
    <Todo></Todo>
  </div>
</template>

<script>
// @ is an alias to /src

import Todo from "../components/TodoBlock";
import Create from "../components/CreateTodo";
export default {
  name: "Home",
  components: { Todo, Create },
};
</script>
