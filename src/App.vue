<template>
  <div v-if="hasToken" id="nav">
    <router-link to="/posts">Posts</router-link> | 
    <router-link to="/profile">Profile</router-link> | 
    <router-link to="/logout">Logout</router-link>
  </div>
  <router-view/>
</template>

<script>
import config from './config'
config.axios.defaults.headers.common = {'Accept': 'application/json', 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Cross-Origin': 'Allow', 'Authorization': `Bearer ${config.userToken}`}

export default {
  data() {
    return {
      hasToken: null,
    }
  },
  watch: {
    $route (newValue, oldValue) {
      this.changeTokenStatus()
    }
  },
  methods: {
    changeTokenStatus() {
      this.hasToken = localStorage.getItem('user-token')
    }
  }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#nav a.logout-link {
  text-decoration: none;
  font-size: 9px;
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
input, select, textarea {
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
button {
    background: #0b6dff;
    border: 0;
    padding: 10px 20px;
    margin-top: 20px;
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
.pb-10 {
    padding-bottom: 10px !important;
}
.mt-10 {
    margin-top: 10px !important;
}
.mt-20 {
    margin-top: 20px !important;
}
a.links {
    margin-top: 20px !important;
}
</style>
