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
            category: {},
            message: ""
        }
    },
    mounted() {
        this.category = this.$route.params.category;
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