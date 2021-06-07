<template>
    <div class="container">
        <form @submit.prevent="edit">
            <CategoryForm ref="categoryForm" :category="category"></CategoryForm>
            <button type="submit" class="btn btn-primary mt-2">Edit</button>
        </form>
    </div>
</template>

<script>
import CategoryForm from "@/components/CategoryForm";

export default {
    name: "EditCategory",
    components: {CategoryForm},
    data() {
        return {
            categoryId: 0,
            category: {},
            message: ""
        }
    },
    beforeMount() {
        this.categoryId = this.$route.params.categoryId;
        this.$axios.get(`/api/categories/find/${this.categoryId}`).then(response => {
            this.category = response.data;
            this.$refs.categoryForm.setCategory(this.category);
        }).catch(err => {
            alert(err.message);
        })

    },
    methods: {
        edit(){
            this.$axios.put("/api/categories", {
                id: this.category.id,
                name: this.category.name,
                description: this.category.description
            }).then(response => {
                this.category = response.data;
                this.$router.push({name: "Categories"});
            }).catch(err => {
                this.message = err.response.data.message;
                this.$refs.categoryForm.setMessage(this.message);
            });
        }
    },
}
</script>

<style scoped>

</style>