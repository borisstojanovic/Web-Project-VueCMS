<template>
    <div class="container">
        <form @submit.prevent="edit">
            <NewsForm ref="newsForm" :news="news"></NewsForm>
            <button type="submit" class="btn btn-primary mt-2">Add</button>
        </form>
    </div>
</template>

<script>
import NewsForm from "@/components/NewsForm";

export default {
    name: "EditNews",
    components: {NewsForm},
    data() {
        return {
            news: {},
        }
    },
    beforeMount() {
        this.news = this.$route.params.news;
        if(this.news === undefined){
            this.$router.push({name: "NewsForCategory"});
        }
    },
    methods: {
        edit(){
            console.log(this.news)
            if(this.news.array === undefined || this.news.array.length < 1){
                //todo error
                alert("Please select at least one tag");
                return ;
            }

            if(this.news.categoryId === undefined || this.news.categoryId <= 0){
                //todo error
                alert("Please select a category");
                return;
            }

            this.$axios.put("/api/news", {
                id: this.news.id,
                title: this.news.title,
                text: this.news.text,
                createdAt: new Date(),
                categoryId: this.news.categoryId,
                userId: this.news.userId,
                views: 0,
                tags: this.news.array
            }).then(response => {
                this.news = response.data;
                this.$router.push({name: "NewsForCategory"});
            }).catch(err => {
                this.$refs.newsForm.setMessage(err.response.data.message);
            });
        }
    },
}
</script>

<style scoped>

</style>