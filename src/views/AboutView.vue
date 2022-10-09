<template>
  <div class="about">
    <NavBar />
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue';

export default {
	components: {
		NavBar,
	}
};
</script>
<style>



#img {
  max-width: 10rem;
}

/* @media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
} */
</style>
