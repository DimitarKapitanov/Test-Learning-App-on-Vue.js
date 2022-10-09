<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <h1 class="title-learning">Welcome</h1>
      <img class="img-nav" src="../assets/male.png" alt="" />
    </div>
  </nav>
  <AddPopupVue :is-open="isPopupOpen" @close="isPopupOpen = false">
  </AddPopupVue>
  <div class="btn">
    <button class="button" @click="openPopup">Add</button>
    <LesonsTableVue />
  </div>
</template>

<script>
import AddPopupVue from './AddPopup.vue';
import LesonsTableVue from './LesonsTable.vue';

export default {
	data() {
		return { isPopupOpen: false, confirmation: '' };
	},
	components: {
		LesonsTableVue,
		AddPopupVue
	},
	methods: {
		openPopup() {
			this.confirmation = '';
			this.isPopupOpen = true;
		}
	}
};
</script>
<style>
.navbar {
  background-color: darkgray;
}
.navbar-brand {
  padding: 0.7rem;
  width: 100%;
  justify-content: space-between;
}
.img-nav {
  max-width: 2rem;
  max-height: 2rem;
}

button {
  margin: 1rem 0.2rem;
  padding: 5px;
}
.title-learning {
  font-size: large;
}
</style>
