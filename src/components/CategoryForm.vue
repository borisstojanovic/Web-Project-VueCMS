<template>
    <div>
        <div class="form-group">
            <label for="name">Name</label>
            <input v-model="category.name" required type="text" class="form-control" id="name" aria-describedby="textHelp" placeholder="Enter name">
            <small style="color: red">{{errMessage}}</small>
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
            message: ""
        }
    },
    props: {
        category: {
            type: Object,
            required: true,
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
        }
    }
}
</script>

<style scoped>

</style>