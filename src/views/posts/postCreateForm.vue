<template>
  <h1>Add post</h1>
  <div>
      <form @submit.prevent="handleCreate">

      <label>Title:</label>
      <input type="text" required v-model="formData.title">

      <label>Body:</label>
      <textarea required rows="5" v-model="formData.post"></textarea>

      <div class="error mt-10" v-for="error in errors" :key="error[0]">{{ error[0] }}</div>

      <div class="submit">
        <button>Add</button>
      </div>
    </form>
  </div>
</template>

<script>
import config from '../../config'

export default {
    data() {
        return {
            formData: {
                title: null,
                post: null,
                device_name: 'browser'
            },
            errors: []          
        }
    },
    methods: {
        handleCreate() {

            config.axios.post('posts', this.formData)
            .then((response) => {
                if (response.data.success === false) {
                    this.errors = [response.data.data]
                } else {
                    this.$router.push('/posts')
                }                
            })
            .catch(err => {
                this.errors = err.response.data.errors
            })

        }
    },
    mounted () {
        if (config.userToken == null) {
            this.$router.push('/')
        }
    }
}
</script>