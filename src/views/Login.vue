<template>
  <h1>Login</h1>
  <div>
      <form @submit.prevent="handleLogin">

      <label>Email:</label>
      <input type="email" required v-model="formData.email">

      <label>Password:</label>
      <input type="password" required v-model="formData.password">

      <div class="error mt-10" v-for="error in errors" :key="error[0]">{{ error[0] }}</div>

      <div class="mt-20">
        <router-link to="/register" class="links">Not a member?</router-link>
      </div>

      <div class="submit">
        <button>Login</button>
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
                device_name: 'browser'
            },
            errors: []          
        }
    },
    methods: {
        handleLogin() {

            config.axios.post('login', this.formData)
            .then((response) => {
                if (response.data.success === false) {
                    this.error = response.data.data
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