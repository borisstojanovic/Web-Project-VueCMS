<template>
    <div class="subjects">
        <h1 class="mt-4">Users</h1>

        <div class="row">
            <div class="col-4">
                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Type</th>
                        <th scope="col">Email</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="user in users" :key="user.id" @click="selectedUser = user">
                        <th scope="row">{{ user.id }}</th>
                        <td>{{ user.type.toLowerCase() | capitalize }}</td>
                        <td @click="selectedUser = users; findNews();" style="cursor: pointer;color: blue">{{ user.email}}</td>
                        <td>{{ user.firstName | capitalize }}</td>
                        <td>{{ user.lastName | capitalize }}</td>
                        <td>
                            <button class="btn btn-primary" @click="selectedUser = user; editUser();">Edit</button>
                            <button v-if="user.status" class="btn btn-danger" @click="selectedUser = user; toggleUser();">Deactivate</button>
                            <button v-if="!user.status" class="btn btn-secondary" @click="selectedUser = user; toggleUser();">Activate</button>
                        </td>
                    </tr>
                    </tbody>
                    <tfoot>
                    <b-pagination
                        v-model="page"
                        :total-rows="count"
                        :per-page="size"
                        @input="fetchUsers"
                    ></b-pagination>
                    <b-form-select v-model="size" :options="sizes" @input="fetchUsers"></b-form-select>
                    </tfoot>
                </table>
                <button class="btn btn-outline-primary" @click="addUser()">Add</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Users",
    data() {
        return {
            selectedUser: null,
            users: [],
            page: 1,
            size: 2,
            count: 0,
            sizes: [2, 4, 6]
        }
    },
    mounted() {
        this.fetchUsers();
    },
    methods: {
        getStatus(user){
            if(user.status === false){
                return "Inactive"
            }
            return "Active"
        },
        editUser() {
            this.$router.push({
                name: "EditUser",
                params: { user: this.selectedUser }
            });
        },
        toggleUser(){
            this.$axios.post("/api/users/deactivate/" + this.selectedUser.id).then(response => {
                console.log(response);
                this.fetchUsers();
            }).catch(err => {
                alert(err.response.data.message)
            })
        },
        fetchUsers(){
            if(this.count <= (this.page-1)*this.size){
                this.page = 1;
            }
            this.$axios.get('/api/users/page', {params: {
                    start: this.page-1,
                    size: this.size
                }}
                ).then((response) => {
                this.count = response.data.count;
                this.users = response.data.data;
            }).catch(err => {
                console.log(err);
                this.$router.push({name: "Home"});
            });
        },
        addUser(){
            this.$router.push({name: "AddUser"});
        }
    },
}
</script>

<style scoped>

</style>
