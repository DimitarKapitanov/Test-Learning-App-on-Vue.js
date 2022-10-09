<template>
  <div v-if="isOpen" class="backdrop">
    <div class="popup">
      <h1>Update row</h1>
      <div class="pop-up is-medium">
        <div class="field">
          <label class="label">* Course name</label>
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="Course name"
              v-model="tableCourseName"
            />
          </div>
          <div class="notification is-danger is-light" v-if="!isCorectCourse">
            <button class="delete"></button>
            Course name is requred!!
          </div>
        </div>

        <div class="field">
          <label class="label">* Lessons</label>
          <div class="control">
            <input
              class="input"
              type="number"
              placeholder="Lessons"
              v-model="tableLessonsCount"
            />
          </div>
          <div class="notification is-danger is-light" v-if="!iscorectLeassons">
            <button class="delete"></button>
            Lessons is requred!!
          </div>
        </div>

        <div class="field">
          <label class="label">Description</label>
          <div class="control">
            <textarea
              class="textarea"
              placeholder="Description"
              v-model="tableDescription"
            ></textarea>
          </div>
        </div>

        <div class="field">
          <label class="label">Image</label>
          <div class="control">
            <input type="text" placeholder="URL link to img" v-model="tableImage" />
          </div>
        </div>
      </div>
      <slot name="actions" :close="close">
        <div class="field is-grouped">
          <div class="control">
            <button
              class="button is-link"
              @click="updateData(tableCourseName, tableLessonsCount, tableDescription, tableImage)"
            >
              Update
            </button>
          </div>
          <div class="control">
            <button class="button is-link is-light" @click="close">
              Cancel
            </button>
          </div>
        </div>
      </slot>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { db } from '@/firebase';
import { collection, doc, updateDoc } from 'firebase/firestore';

export default {
	data() {
		return {
			isCorectCourse: true,
			iscorectLeassons: true,
			id: '',
			courseName: '',
			lessonsCount: '',
			description: '',
			image: ''
		};
	},
	props: {
		isOpen: {
			type: Boolean,
			required: true
		},
		dataId: {
			type: String,
			required: true
		},
		tableCourseName: {
			type: String,
			required: true
		},
		tableLessonsCount: { type: Number, required: true },
		tableDescription: { type: String, required: true },
		tableImage: { type: String, required: true }
	},
	emits: {
		ok: null,
		close: null
	},
	methods: {
		updateData(courseName, lessonsCount, description, image) {
			console.log(this.tableCourseName);
			if (courseName === undefined || courseName === '') {
				this.isCorectCourse = false;
				return this.isCorectCourse;
			}
			this.iscorectLeassons = true;
			if (lessonsCount === undefined || lessonsCount === '') {
				this.iscorectLeassons = false;
				return this.iscorectLeassons;
			} else {
				this.isCorectCourse = true;
				const updateRow = doc(collection(db, 'LearningApp'), this.dataId);

				// Set the "capital" field of the city 'DC'
				updateDoc(updateRow, {
					courseName: courseName,
					lessonsCount: lessonsCount,
					description: description,
					image: image
				})
				;(this.courseName = ''),
				(this.lessonsCount = 0),
				(this.description = ''),
				(this.image = '');
			}
		},

		close() {
			this.$emit('close');
		}
	}
};
</script>

<style>
.popup {
  top: 50px;
  padding: 20px;
  left: 50%;
  transform: translateX(-50%);
  position: fixed;
  z-index: 101;
  background-color: white;
  border-radius: 10px;
}

.popup h1 {
  text-align: center;
  margin: 0;
}

.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 100;
}
</style>
