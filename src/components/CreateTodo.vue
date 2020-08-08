<template>
  <div>
    <router-link :to="{name: 'edit'}">
      <button @click="AB">+</button>
    </router-link>
  </div>
</template>

<script>
export default {
  methods: {
    AB() {
      console.log(this.$route.params.id);
    },
  },
};
</script>