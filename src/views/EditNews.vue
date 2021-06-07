<template>
    <div class="container">
        <form @submit.prevent="edit">
            <NewsForm ref="newsForm" :news="news"></NewsForm>
            <button type="submit" class="btn btn-primary mt-2">Edit</button>
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
            newsId: 0
        }
    },
    beforeMount() {
        this.newsId = this.$route.params.newsId;
        this.$axios.get(`/api/news/${this.newsId}`).then(response => {
            this.news = response.data;
            this.$refs.newsForm.setNews(this.news);
        }).catch(err=>{
            alert(err.message)
            this.$router.push({name: "NewsForCategory"});
        })
        if(this.news === undefined || this.news === null){
            this.$router.push({name: "NewsForCategory"});
        }
    },
    methods: {
        edit(){
            if(this.news.array === undefined || this.news.array.length < 1){
                //todo error
                alert("Please select at least one tag");
                this.$refs.newsForm.setMessage("Please select at least one tag");
                return ;
            }

            if(this.news.categoryId === undefined || this.news.categoryId <= 0){
                //todo error
                alert("Please select a category");
                this.$refs.newsForm.setMessage("Please select at least one tag");
                return;
            }

            this.$axios.put("/api/news", {
                id: this.news.id,
                title: this.news.title,
                text: this.news.text,
                createdAt: this.news.createdAt,
                categoryId: this.news.categoryId,
                userId: this.news.userId,
                views: this.news.views,
                tags: this.news.array
            }).then(response => {
                this.news = response.data;
                this.$router.push({name: "NewsForCategory"});
            }).catch(err => {
                this.$refs.newsForm.setMessage(err.response.data.message);
            });
        },
    },
}
</script>

<style scoped>

</style>