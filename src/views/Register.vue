<template>
  <h1>Register</h1>
  <div>
      <form @submit.prevent="handleRegister">

      <label>Name:</label>
      <input type="text" required v-model="formData.name">

      <label>Email:</label>
      <input type="email" required v-model="formData.email">

      <label>Password:</label>
      <input type="password" required v-model="formData.password">

      <label>Confirm:</label>
      <input type="password" class="pb-10" required v-model="formData.password_confirmation">

      <div class="error mt-10" v-for="error in errors" :key="error[0]">{{ error[0] }}</div>

      <div class="mt-20">
        <router-link to="/" class="links">Already a member?</router-link>
      </div>      

      <div class="submit">
        <button>Register</button>
      </div>
    </form>
  </div>
</template>

<script>
import config from '../config'

export default {
    data() {
        return {
            formData: {
                email: null,
                password: null,
                password_confirmation: null,
                name: null,
                device_name: 'browser'
            },
            errors: []          
        }
    },
    methods: {
        handleRegister() {

            config.axios.post('register', this.formData)            
            .then((response) => {
                if (response.data.success === false) {
                    this.errors = [response.data.data]
                } else {
                    localStorage.setItem('user-token',response.data.token)
                    config.userToken = response.data.token
                    this.$router.push('/posts')
                }                
            })
            .catch(err => {
                this.errors = err.response.data.errors
            })

        }
    },
    mounted () {
        if (localStorage.getItem('user-token') != null) {
            this.$router.push('/posts')
        }
    },
}
</script>