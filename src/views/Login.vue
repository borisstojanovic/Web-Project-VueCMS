<template>
  <div class="pt-5">
    <h1 v-if="email">Hello, {{email}}</h1>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="email">Email</label>
        <input required v-model="email" type="text" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email">
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input required v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
      </div>
      <button type="submit" class="btn btn-primary mt-2">Submit</button>
        <br>
        <h5 style="color: red">{{message}}</h5>
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
      message: '',
    }
  },
  methods: {
    login() {
      this.$axios.post('/api/users/login', {
          email: this.email,
          password: this.password,
      }).then(response => {
          localStorage.setItem('jwt', response.data.jwt);
          console.log(response.data.user)
          localStorage.setItem('user', JSON.stringify(response.data.user));
          this.$root.$emit('logged', 'User logged')
          this.$router.push({name: 'Home'});
      }).catch(err => {
          this.message = err.response.data.message;
      });
    }
  },
}
</script>

<style scoped>

</style>
