<template>
    <div class="subjects">
        <h1 class="mt-4">Categories</h1>

        <div class="row">
            <div class="col-4">
                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="category in categories" :key="category.id" @click="selectedCategory = category">
                        <th scope="row">{{ category.id }}</th>
                        <td @click="selectedCategory = category; findNews();" style="cursor: pointer;color: blue">{{ category.name | capitalize }}</td>
                        <td>{{ category.description | shortText }}</td>
                        <td>
                            <button class="btn btn-primary" @click="selectedCategory = category; editCategory();">Edit</button>
                            <button class="btn btn-danger" @click="selectedCategory = category; deleteCategory();">Delete</button>
                        </td>
                    </tr>
                    </tbody>
                    <tfoot>
                        <b-pagination
                            v-model="page"
                            :total-rows="count"
                            :per-page="size"
                            @input="fetchCategories"
                        ></b-pagination>
                        <b-form-select v-model="size" :options="sizes" @input="fetchCategories"></b-form-select>
                    </tfoot>
                </table>
                <button class="btn btn-outline-primary" @click="addCategory()">Add</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Categories",
    filters: {
        shortText(value) {
            if (value.length < 30) {
                return value;
            }
            return value.slice(0, 30) + '...'
        }
    },
    data() {
        return {
            selectedCategory: null,
            categories: [],
            page: 1,
            size: 2,
            count: 0,
            sizes: [2, 4, 6]
        }
    },
    mounted() {
        this.fetchCategories();
    },
    methods: {
        editCategory() {
            this.$router.push({
                name: "editCategory",
                params: { category: this.selectedCategory }
            });
        },
        deleteCategory(){
            this.$axios.delete("/api/categories/" + this.selectedCategory.id).then(response => {
                console.log(response);
                this.$axios.get('/api/categories').then((response) => {
                    this.categories = response.data;
                });
            }).catch(err => {
                alert(err.response.data.message)
            })
        },
        fetchCategories(){
            if(this.count <= (this.page-1)*this.size){
                this.page = 1;
            }
            this.$axios.get('/api/categories/page', {params: {
                    start: this.page-1,
                    size: this.size
                }}).then((response) => {
                this.count = response.data.count;
                this.categories = response.data.data;
            });
        },
        findNews() {
            alert(this.selectedCategory)
        },
        addCategory(){
            this.$router.push({name: "addCategory"});
        }
    },
}
</script>

<style scoped>

</style>
