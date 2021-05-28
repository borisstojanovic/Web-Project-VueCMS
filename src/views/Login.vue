<template>
  <div class="pt-5">
    <h1 v-if="email">Hello, {{email}}</h1>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="email">Email</label>
        <input v-model="email" type="text" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email">
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
      </div>
      <button type="submit" class="btn btn-primary mt-2">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    login() {
      this.$axios.post('/api/users/login', {
          email: this.email,
          password: this.password,
      }).then(response => {
          console.log(response.data)
          localStorage.setItem('jwt', response.data.jwt);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          this.$router.push({name: 'Home'});
      }).catch(err => {
          alert(err);
      });
    }
  },
}
</script>

<style scoped>

</style>
