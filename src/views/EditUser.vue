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
            user: {},
            message: ""
        }
    },
    mounted() {
        this.user = this.$route.params.user;
        this.user.isEdit = true;
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