<template>
  <h1>Posts</h1>
  <div class="mb-10">
      <router-link to="/create">Add new post</router-link>
  </div>
  <div class="mb-10">
      <form @submit.prevent="handleRegister">
        <label>Search:</label>
        <input type="text" required @keyup="searchPosts" v-model="formData.search">
      </form>
  </div>
  <div v-if="posts.length">
    <div v-for="post in posts" :key="post.id" class="posts">
        <router-link :to="{ name: 'postDetails', params: { id: post.id } }">
            <h2>{{ post.title }}</h2>
        </router-link>
    </div>
  </div>
  <div v-else>
    <p>loading posts...</p>
  </div>
</template>

<script>
import config from '../../config'

export default {
    data() {
        return {
            posts: [],
            formData: {
                search: null
            }
        }
    },
    methods: {
        searchPosts() {
            config.axios.get('posts/search/' + this.formData.search)
            .then(resData => this.posts = resData.data.data)
            .catch(err => console.log(err.message))
        }
    },
    mounted () {

        if (config.userToken == null) {
            this.$router.push('/')
        }

        config.axios.defaults.headers.common = {'Accept': 'application/json', 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Cross-Origin': 'Allow', 'Authorization': `Bearer ${config.userToken}`}
        config.axios.get('posts')
        .then(resData => this.posts = resData.data.data)
        .catch(err => console.log(err.message))
    },
}
</script>

<style scoped>
.posts h2{
    background: #f4f4f4;
    padding: 20px;
    border-radius: 10px;
    margin: 10px auto;
    max-width: 600px;
    cursor: pointer;
    color: #444;
}
.posts h2:hover {
    background: #ddd;
}
.posts a{
    text-decoration: none;
}
.mb-10 {
    margin-bottom: 10px;
}
</style>