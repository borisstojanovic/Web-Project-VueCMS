<template>
    <div v-if="!loading">
        <div class="text-start">
            <h5 style="color: red;">{{errMessage}}</h5>
        </div>
        <div class="form-group">
            <label for="name">Name</label>
            <input v-model="category.name" required type="text" class="form-control" id="name" aria-describedby="textHelp" placeholder="Enter name">
        </div>
        <div class="form-group">
            <label for="description">Description</label>
            <textarea v-model="category.description" required type="text" class="form-control" id="description" placeholder="Enter Description"/>
        </div>
    </div>
</template>

<script>
export default {
    name: "CategoryForm",
    data(){
        return {
            message: "",
            loading: true,
            category: {}
        }
    },

    computed: {
        errMessage(){
            return this.message;
        }
    },
    methods: {
        setMessage: function (message){
            this.message = message;
        },
        setCategory(category){
            this.category = category;
            this.loading = false;
        }
    }
}
</script>

<style scoped>

</style>