<template>
  <div v-if="post">
    <h1>{{ post.title }}</h1>
    <p>{{ post.body }}</p>
    <h5>{{ post.created_at }}</h5>
  </div>
  <div v-else>
    <p>loading post details...</p>
  </div>
</template>

<script>
import config from '../../config'

export default {
    props: ['id'],
    data() {
      return {
        post: null
      }
    },
    mounted () {

      if (config.userToken == null) {
        this.$router.push('/')
      }

      config.axios.get('posts/' + this.id)
        .then(resData => this.post = resData.data.data)
        .catch(err => console.log(err.message))
    },
}
</script>

<style>

</style>