import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Profile from '../views/Profile.vue'
import Posts from '../views/posts/Posts.vue'
import postDetails from '../views/posts/postDetails.vue'
import postCreateForm from '../views/posts/postCreateForm.vue'
import postEditForm from '../views/posts/postEditForm.vue'
import Logout from '../views/Logout.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/posts',
    name: 'Posts',
    component: Posts,
    props: true
  },
  {
    path: '/posts/:id',
    name: 'postDetails',
    component: postDetails,
    props: true
  },
  {
    path: '/create',
    name: 'postCreateForm',
    component: postCreateForm
  },
  {
    path: '/edit/:id',
    name: 'postEditForm',
    component: postEditForm,
    props: true
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
