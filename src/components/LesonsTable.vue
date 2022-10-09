<template>
  <UpdatePopup
    :is-open="isPopupOpen"
    :data-id="(id = id)"
    :table-course-name="(courseName = courseName)"
    :table-lessons-count="(lessonsCount = lessonsCount)"
    :table-image="(image = image)"
    :table-description="(description = description)"
    @close="isPopupOpen = false"
  >
  </UpdatePopup>
  <table class="table is-bordered is-fullwidth">
    <thead>
      <tr>
        <th class="is-vcentered has-text-centered">ID</th>
        <th class="is-vcentered is-narrow has-text-centered">Course name</th>
        <th class="is-vcentered has-text-centered">Description</th>
        <th class="is-vcentered has-text-centered">Lesons(count)</th>
        <th class="is-vcentered has-text-centered">State</th>
        <th class="is-vcentered has-text-centered">DateAdded</th>
        <th class="is-vcentered has-text-centered">Image</th>
        <th class="is-vcentered has-text-centered"></th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(tr, i) in tableBody"
        :key="tr.id"
        class="tableRow is-align-content-center is-bordered"
        :class="{ highlight: tr.selectedRow == true }"
      >
        <td class="is-vcentered has-text-centered">{{ i + 1 }}</td>
        <td class="is-vcentered has-text-centered">{{ tr.courseName }}</td>
        <td class="is-vcentered has-text-centered">{{ tr.description }}</td>
        <td class="is-vcentered has-text-centered">{{ tr.lessonsCount }}</td>
        <td class="is-vcentered has-text-centered">
          <select id="state">
            <option :value="tr.state[0]">Active</option>
            <option :value="tr.state[1]">Archive</option>
          </select>
        </td>
        <td class="is-vcentered has-text-centered">{{ tr.dateAdded }}</td>
        <td class="is-vcentered has-text-centered">
          <img id="img" :src="tr.image" alt="" />
        </td>
        <td>
          <button
            class="button is-rounded is-small is-warning"
            @click="
              openPopup(
                tr.id,
                tr.courseName,
                tr.description,
                tr.lessonsCount,
                tr.image
              )
            "
          >
            Update
          </button>
          <button
            class="button is-rounded is-small is-danger"
            @click="deliteRow(tr.id)"
          >
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import UpdatePopup from './UpdatePopup.vue';
export default {
	data() {
		return {
			isPopupOpen: false,
			confirmation: '',
			id: '',
			courseName: '',
			description: '',
			lessonsCount: 0,
			image: ''
		};
	},
	components: {
		UpdatePopup
	},
	methods: {
		openPopup(id, courseName, description, lessonsCount, image) {
			this.confirmation = '';
			this.isPopupOpen = true;
			this.id = id;
			this.courseName = courseName;
			this.lessonsCount = lessonsCount;
			this.description = description;
			this.image = image;
		}
	}
};
</script>

<script setup>
import { ref } from 'vue';
import { db } from '@/firebase';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';

const tableBody = ref([]);

const deliteRow = (id) => {
	deleteDoc(doc(collection(db, 'LearningApp'), id));
};

onSnapshot(collection(db, 'LearningApp'), (querySnapshot) => {
	let tableDataArr = [];
	querySnapshot.forEach((doc) => {
		let data = doc.data();
		let date = new Date(data.dateAdded);
		const tableDataDataObj = {
			id: doc.id,
			courseName: data.courseName,
			lessonsCount: data.lessonsCount,
			description: data.description,
			state: data.state,
			dateAdded:
        date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear(),
			image: data.image
		};

		tableDataDataObj.state.push('Activate');
		tableDataDataObj.state.push('Archive');
		tableDataArr.push(tableDataDataObj);
	});
	tableBody.value = tableDataArr;
});
</script>

<style>
tr:hover {
  cursor: pointer;
}

.table {
  margin-bottom: 3rem;
}
</style>
