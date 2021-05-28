<template>
    <div class="container">
        <form @submit.prevent="add">
            <CategoryForm ref="categoryForm" :category="category"></CategoryForm>
            <button type="submit" class="btn btn-primary mt-2">Add</button>
        </form>
    </div>
</template>

<script>
import CategoryForm from "@/components/CategoryForm";

export default {
    name: "AddCategory",
    components: {CategoryForm},
    data() {
        return {
            category: {},
        }
    },
    methods: {
        add(){
            this.$axios.post("/api/categories", {
                name: this.category.name,
                description: this.category.description
            }).then(response => {
                this.category = response.data;
                this.$router.push({name: "Categories"});
            }).catch(err => {
                this.$refs.categoryForm.setMessage(err.response.data.message);
            });
        }
    },
}
</script>

<style scoped>

</style>