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
          </ul>
            <div v-if="isUser" class="d-flex">
                <router-link to="/" tag="a" class="nav-link" v-text="getUser.firstName  + ' ' + getUser.lastName"></router-link>
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
  computed: {
    canLogout() {
        return this.$route.name !== 'Login' && localStorage.getItem('jwt') !== null;

    },
    canLogin(){
        return this.$route.name !== 'Login' && localStorage.getItem('jwt') === null;
    },
    isUser(){
        return this.$route.name !== 'Login' && localStorage.getItem('user') !== null;
    },
    getUser(){
        let user = JSON.parse(localStorage.getItem('user'))
        return user
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('jwt');
        localStorage.removeItem('user');
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
