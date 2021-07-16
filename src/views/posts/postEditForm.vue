<template>
  <h1>Edit post</h1>
  <div>
      <form @submit.prevent="handleCreate">

      <label>Title:</label>
      <input type="text" required v-model="formData.title">

      <label>Body:</label>
      <textarea required rows="5" v-model="formData.post"></textarea>

      <div class="error mt-10" v-for="error in errors" :key="error[0]">{{ error[0] }}</div>

      <div class="submit">
        <button>Update</button>
      </div>
    </form>
  </div>
</template>

<script>
import config from '../../config'

export default {
    props: ['id'],
    data() {
        return {
            formData: {
                id: null,
                title: null,
                post: null,
                device_name: 'browser'
            },
            errors: []          
        }
    },
    methods: {
        handleCreate() {

            config.axios.put('posts/' + this.id, this.formData)
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

        config.axios.get('posts/' + this.id)
        .then(resData => {
            console.log(resData.data.data.title)
            this.formData.id = this.id
            this.formData.title = resData.data.data.title
            this.formData.post = resData.data.data.body
        })
        .catch(err => console.log(err.message))
    }
}
</script>