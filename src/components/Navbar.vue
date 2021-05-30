<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Web CMS</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/" tag="a" class="nav-link" :class="{active: this.$router.currentRoute.name === 'Home'}">Home</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/categories" tag="a" class="nav-link" :class="{active: this.$router.currentRoute.name === 'Categories'}">Categories</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/allNews" tag="a" class="nav-link" :class="{active: this.$router.currentRoute.name === 'NewsForCategory'}">News</router-link>
            </li>
            <li class="nav-item" v-if="isAdmin">
                <router-link to="/users" tag="a" class="nav-link" :class="{active: this.$router.currentRoute.name === 'Users'}">Users</router-link>
            </li>
          </ul>
            <div v-if="isLoggedIn" class="d-flex">
                <router-link to="/" tag="a" class="nav-link" v-text="user.firstName  + ' ' + user.lastName"></router-link>
            </div>
          <form v-if="canLogout" class="d-flex" @submit.prevent="logout">
            <button class="btn btn-outline-secondary" type="submit">Logout</button>
          </form>
            <form v-if="canLogin" class="d-flex" @submit.prevent="login">
                <button class="btn btn-outline-secondary" type="submit">Login</button>
            </form>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
      return {
          user: {},
          isLoggedIn: false,
          isAdmin: false
      }
  },
  created () {
     this.$root.$on('logged', () => {
        this.user = JSON.parse(localStorage.getItem('user'));
        this.isLoggedIn = true;
        this.isAdmin = this.user !== undefined && this.user.type === 'ADMIN';
     })
  },
  computed: {
    canLogout() {
        return this.$route.name !== 'Login' && localStorage.getItem('jwt') !== null;
    },
    canLogin(){
        return this.$route.name !== 'Login' && localStorage.getItem('jwt') === null;
    },
  },
  methods: {
    logout() {
      localStorage.removeItem('jwt');
      localStorage.removeItem('user');
      this.user = {};
      this.isAdmin = false;
      this.isLoggedIn = false;
      this.$router.push({name: 'Login'});
    },
    login(){
        this.$router.push({name: 'Login'});
    }
  }
}
</script>

<style scoped>

</style>
