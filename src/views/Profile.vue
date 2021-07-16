<template>
  <h1>Profile data</h1>
  <div v-if="user">

    <form @submit.prevent="handleSubmit">

      <label>Name:</label>
      <input type="text" required v-model="user.name">

      <label>Email:</label>
      <input type="email" required v-model="user.email">

      <div class="submit">
        <button>Update data</button>
      </div>
    </form>

  </div>
  <div v-else>
    <p>loading user details...</p>
  </div>
  <h1>My Posts</h1>
  <div v-if="posts.length">
    <div v-for="post in posts" :key="post.id" class="posts">
        <h2>{{ post.title }}</h2>
        <p>{{ post.body }}</p>
        <h5>{{ post.created_at }} - {{ post.approved == 1 ? 'approved' : 'not-approved' }}</h5>
        
        <router-link class="btn-link" :to="{ name: 'postEditForm', params: { id: post.id } }">
            Edit
        </router-link>
        
        <button @click="deletePost(post.id)">Delete</button>
    </div>
  </div>
  <div v-else>
    <p>loading posts...</p>
  </div>
</template>

<script>
import config from '../config'

export default {
    data() {
      return {
        user: null,
        posts: []
      }
    },
    methods: {
      getMyPosts() {
        // Get this users posts
        config.axios.get('my-posts')
        .then(resData => this.posts = resData.data.data)
        .catch(err => console.log(err.message))
      },
      handleSubmit() {
        config.axios.put('users/' + this.user.id,{
          name: this.user.name,
          email: this.user.email
        })
        .then(resData => this.posts = resData.data.data)
        .catch(err => console.log(err.message))
      },
      deletePost(id) {
        config.axios.delete('posts/' + id)
        .then(resData => this.user = resData.data.data)
        .catch(err => console.log(err.message))
        this.getMyPosts()
      }
    },
    mounted () {

      if (config.userToken == null) {
        this.$router.push('/')
      }

      // Get user data
      config.axios.get('profile')
        .then(resData => this.user = resData.data.data)
        .catch(err => console.log(err.message))

        // Get user published posts
        this.getMyPosts()
    },
}
</script>

<style scoped>
.posts{
    background: #f4f4f4;
    padding: 20px;
    border-radius: 10px;
    margin: 10px auto;
    max-width: 600px;
    cursor: pointer;
    color: #444;
}
.posts {
    background: #ddd;
}
form {
    max-width: 420px;
    margin: 30px auto;
    background: white;
    text-align: left;
    padding: 40px;
    border-radius: 10px;
}
label {
    color: #aaa;
    display: inline-block;
    margin: 25px 0 15px;
    font-size: 0.6em;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
}
input, select {
    display: block;
    padding: 10px 6px;
    width: 100%;
    box-sizing: border-box;
    border: none;
    border-bottom: 1px solid #ddd;
    color: #555;
}
input[type="checkbox"] {
    display: inline-block;
    width: 16px;
    margin: 0 10px 0 0;
    position: relative;
    top: 2px;
}
.pill {
    display: inline-block;
    margin: 20px 10px 0 0;
    padding: 6px 12px;
    background: #eee;
    border-radius: 20px;
    font-size: 12px;
    letter-spacing: 1px;
    font-weight: bold;
    color: #777;
    cursor: pointer;
}
button, a.btn-link {
    text-decoration: none;
    font-size: 12px;
    background: #0b6dff;
    border: 0;
    padding: 10px 20px;
    margin-top: 20px;
    margin-right: 5px;
    color: white;
    border-radius: 20px;
}
.submit {
    text-align: center;
}
.error {
    color: #ff0062;
    margin-top: 10px;
    font-size: 0.8em;
    font-weight: bold;
}
</style>