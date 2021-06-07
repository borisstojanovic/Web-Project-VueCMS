<template>
    <div v-if="!loading">
        <div class="text-start">
            <h5 style="color: red;">{{message}}</h5>
        </div>
        <div class="form-group">
            <label for="email">Email</label>
            <input v-model="user.email" required type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter Email">
        </div>
        <div class="form-group">
            <label for="firstName">First Name</label>
            <input v-model="user.firstName" required type="text" class="form-control" id="firstName" placeholder="Enter First Name"/>
        </div>
        <div class="form-group">
            <label for="lastName">Last Name</label>
            <input v-model="user.lastName" required type="text" class="form-control" id="lastName" placeholder="Enter Last Name"/>
        </div>
        <div class="form-group">
            <label>Type</label>
            <multiselect v-model="user.type" :options="types" placeholder="Select one"></multiselect>
            <small style="color: red">{{typeErrMessage}}</small>
        </div>
        <div v-if="!user.isEdit">
            <div class="form-group">
                <label for="password">Password</label>
                <input v-model="user.password" required type="password" class="form-control" id="password" placeholder="Enter Password"/>
            </div>
            <div class="form-group">
                <label for="password2">Confirm Password</label>
                <input v-model="user.password2" required type="password" class="form-control" id="password2" placeholder="Confirm Password"/>
                <small style="color: red">{{passwordErrMessage}}</small>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "UserForm",
    data(){
        return {
            loading: true,
            userId: 0,
            user: {},
            passwordError: "",
            message: "",
            typeError: "",
            types: ["ADMIN", "CREATOR"]
        }
    },
    computed: {
        errMessage(){
            return this.message;
        },
        passwordErrMessage(){
            return this.passwordError;
        },
        typeErrMessage(){
            return this.typeError;
        }
    },
    methods: {
        setMessage(message){
            this.message = message;
        },
        setPasswordErrorMessage(message){
            this.passwordError = message;
        },
        setTypeErrorMessage(message){
            this.typeError = message;
        },
        setUser(user){
            this.user = user;
            this.loading = false;
        }
    }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>

</style>