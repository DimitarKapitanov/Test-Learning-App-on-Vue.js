<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <RouterView />
  <footer class="footer">
    <RouterLink to="/" class="home">Home</RouterLink>
    <RouterLink to="/about" class="about">About</RouterLink>
    <p>Test learning app wiht Vue.js</p>
  </footer>
</template>

<style>
.footer {
  background-color: darkgrey;
  display: flex;
  justify-content: space-evenly;
  align-content: space-around;
  text-align: center;
}
.home {
  color: black;
}
.about {
  color: black;
}
</style>
