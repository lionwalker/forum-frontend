<template>
  <h3 v-if="!loggedOut">Logging out...</h3>
</template>

<script>
import config from '../config'

export default {
    data() {
        return {
            loggedOut: false
        }
    },
    mounted () {
        config.axios.post('logout')
        .then((response) => {
            if (response.data.success === false) {
                this.error = response.data.data
            } else {
                console.log('logout');
                this.loggedOut = true
                config.userToken = null
                localStorage.removeItem('user-token')
                this.$router.push('/')
            }   
        })
        .catch(err => console.log(err.message))
    },
}
</script>

<style>

</style>