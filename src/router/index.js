import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/categories',
    name: 'Categories',
    component: () => import('../views/Categories.vue'),
    meta: {
      authRequired: true
    }
  },
  {
    path: '/editCategory',
    name: 'editCategory',
    component: () => import('../views/EditCategory.vue'),
    meta: {
      authRequired: true
    }
  },
  {
    path: '/addCategory',
    name: 'addCategory',
    component: () => import('../views/AddCategory.vue'),
    meta: {
      authRequired: true
    }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.authRequired) {
    const jwt = localStorage.getItem('jwt');

    if (!jwt) {
      next({name: 'Login'});
      return;
    }

    const payload = JSON.parse(atob(jwt.split('.')[1]));
    const expDate = new Date(payload.exp * 1000);
    if (expDate < new Date()) {
      next({name: 'Login'});
      return;
    }
  }

  next();
});

export default router
