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
    path: '/allNews',
    name: 'NewsForCategory',
    component: () => import('../views/NewsForCategory.vue'),
    meta: {
      authRequired: true
    }
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('../views/Users.vue'),
    meta: {
      authRequired: true,
      adminRequired: true
    }
  },
  {
    path: '/editUser/:email',
    name: 'EditUser',
    params: true,
    component: () => import('../views/EditUser.vue'),
    meta: {
      authRequired: true,
      adminRequired: true
    }
  },
  {
    path: '/addUser',
    name: 'AddUser',
    component: () => import('../views/AddUser.vue'),
    meta: {
      authRequired: true,
      adminRequired: true
    }
  },
  {
    path: '/editNews/:newsId',
    name: 'EditNews',
    params:true,
    component: () => import('../views/EditNews.vue'),
    meta: {
      authRequired: true
    }
  },
  {
    path: '/addNews',
    name: 'AddNews',
    component: () => import('../views/AddNews.vue'),
    meta: {
      authRequired: true
    }
  },
  {
    path: '/editCategory/:categoryId',
    name: 'editCategory',
    params: true,
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
  if (to.meta.adminRequired){
    const user = JSON.parse(localStorage.getItem("user"));
    if(!user){
      next({name: 'Login'});
      return;
    }

    const type = user.type;
    if(type !== 'ADMIN'){
      next({name: 'Home'})
      return;
    }
  }
  next();
});

export default router
