<template>
  <div v-if="isOpen" class="backdrop">
    <div class="popup">
      <h1>Add course</h1>
      <div class="pop-up is-medium">
        <div class="field">
          <label class="label">* Course name</label>
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="Course name"
              v-model="courseName"
            />
          </div>
          <div class="notification is-danger is-light" v-if="!isCorectCourse">
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
              v-model="lessonsCount"
            />
          </div>
          <div class="notification is-danger is-light" v-if="!iscorectLeassons">
            Lessons is requred!!
          </div>
        </div>

        <div class="field">
          <label class="label">Description</label>
          <div class="control">
            <textarea
              class="textarea"
              placeholder="Description"
              v-model="description"
            ></textarea>
          </div>
        </div>

        <div class="field">
          <label class="label">Image</label>
          <div class="control">
            <input type="text" placeholder="URL link to img" v-model="image" />
          </div>
        </div>
      </div>
      <slot name="actions" :close="close">
        <div class="field is-grouped">
          <div class="control">
            <button
              class="button is-link"
              @click="submitData(courseName, lessonsCount, description, image)"
            >
              Submit
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
import { collection, addDoc } from 'firebase/firestore';

export default {
	data() {
		return {
			isCorectCourse: true,
			iscorectLeassons: true,
			courseName: '',
			lessonsCount: '',
			description: '',
			image:''
		};
	},
	props: {
		isOpen: {
			type: Boolean,
			required: true
		}
	},
	emits: {
		ok: null,
		close: null
	},
	methods: {
		submitData(courseName, lessonsCount, description, image) {
			if (courseName === undefined) {
				this.isCorectCourse = false;
				return this.isCorectCourse;
			}
			if (lessonsCount === undefined || lessonsCount === ''){
				this.iscorectLeassons = false;
				return this.iscorectLeassons;
			} else {
				this.iscorectLeassons = true;
				this.isCorectCourse = true;

				addDoc(collection(db, 'LearningApp'), {
					courseName: courseName,
					lessonsCount: lessonsCount,
					description: description ? description : '',
					state: ['Activate', 'Archive'],
					dateAdded: Date.now(),
					image: image ? image : ''
				});
				this.courseName= '',
				this.lessonsCount = 0,
				this.description = '',
				this.image = '';
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
