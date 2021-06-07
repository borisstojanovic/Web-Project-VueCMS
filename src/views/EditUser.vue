<template>
    <div class="container">
        <form @submit.prevent="edit">
            <UserForm ref="userForm" :user="user"></UserForm>
            <button type="submit" class="btn btn-primary mt-2">Edit</button>
        </form>
    </div>
</template>

<script>
import UserForm from "@/components/UserForm";

export default {
    name: "EditUser",
    components: {UserForm},
    data() {
        return {
            email: 0,
            user: {},
            message: ""
        }
    },
    beforeMount() {
        this.email = this.$route.params.email;
        this.$axios.get(`/api/users`, { params: {
            email: this.email
            }}).then(response => {
            this.user = response.data;
            this.user.isEdit = true;
            this.$refs.userForm.setUser(this.user);
        }).catch(err => {
            alert(err.message)
        })

    },
    methods: {
        edit(){
            if(this.user.type === undefined || this.user.type === null || this.user.type.length === 0){
                this.$refs.userForm.setTypeErrorMessage("Please select a type");
                return;
            }
            this.$axios.put("/api/users", {
                id: this.user.id,
                email: this.user.email,
                firstName: this.user.firstName,
                lastName: this.user.lastName,
                type: this.user.type,
                status: true,
                password: this.user.password
            }).then(response => {
                let newUser = response.data;
                let currentUser = JSON.parse(localStorage.getItem('user'));
                if(currentUser.id === newUser.id){
                    localStorage.setItem('user', JSON.stringify(newUser));
                    this.$root.$emit("logged", "User changed");
                }
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