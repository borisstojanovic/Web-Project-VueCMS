<template>
    <div class="container">
        <form @submit.prevent="add">
            <UserForm ref="userForm" :user="user"></UserForm>
            <button type="submit" class="btn btn-primary mt-2">Add</button>
        </form>
    </div>
</template>

<script>
import UserForm from "@/components/UserForm";

export default {
    name: "AddUser",
    components: {UserForm},
    data() {
        return {
            user: {},
            message: ""
        }
    },
    mounted() {
        this.$refs.userForm.setUser(this.user);
    },
    methods: {
        add(){
            if(this.user.password !== this.user.password2){
                this.$refs.userForm.setPasswordErrorMessage("Passwords Do Not Match");
                return;
            }
            if(this.user.type === undefined || this.user.type === null || this.user.type.length === 0){
                this.$refs.userForm.setTypeErrorMessage("Please select a type");
                return;
            }
            this.$axios.post("/api/users", {
                email: this.user.email,
                firstName: this.user.firstName,
                lastName: this.user.lastName,
                type: this.user.type,
                status: true,
                password: this.user.password
            }).then(response => {
                this.user = response.data;
                this.$router.push({name: "Users"});
            }).catch(err => {
                this.message = err.response.data.message;
                this.$refs.userForm.setMessage(this.message);
            });
        }
    },
}
</script>

<style scoped>

</style>