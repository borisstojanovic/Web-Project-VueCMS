<template>
    <div class="subjects">
        <h1 class="mt-4">News</h1>

        <div class="row">
            <div class="col-4">
                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Title</th>
                        <th scope="col">Text</th>
                        <th scope="col">Created at</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="singleNews in sortedNews" :key="singleNews.id" @click="selectedNews = singleNews">
                        <th scope="row">{{ singleNews.id }}</th>
                        <td><a target="_" :href="linkToNews + singleNews.id">{{ singleNews.title | capitalize }}</a></td>
                        <td>{{ singleNews.text | shortText }}</td>
                        <td>{{formatDate(singleNews.createdAt)}}</td>
                        <td>
                            <button class="btn btn-primary" @click="selectedNews = singleNews; editNews();">Edit</button>
                            <button class="btn btn-danger" @click="selectedNews = singleNews; deleteNews();">Delete</button>
                        </td>
                    </tr>
                    </tbody>
                    <tfoot>
                    <b-pagination
                        v-model="page"
                        :total-rows="count"
                        :per-page="size"
                        @input="fetchNews"
                    ></b-pagination>
                    <b-form-select v-model="size" :options="sizes" @input="fetchNews"></b-form-select>
                    </tfoot>
                </table>
                <button class="btn btn-outline-primary" @click="addNews()">Add</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "NewsForCategory",
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
            selectedNews: null,
            news: [],
            categoryId: 0,
            page: 1,
            size: 2,
            count: 0,
            sizes: [2, 4, 6],
            linkToNews: "http://localhost:8086/#SingleNews/"
        }
    },
    mounted() {
        if(this.$route.params.categoryId !== undefined) {
            this.categoryId = this.$route.params.categoryId;
        }
        this.fetchNews();
    },
    methods: {
        editNews() {
            this.$router.push({
                name: "EditNews",
                params: { newsId: this.selectedNews.id }
            });
        },
        deleteNews(){
            this.$axios.delete("/api/news/" + this.selectedNews.id).then(response => {
                console.log(response);
                this.fetchNews();
            }).catch(err => {
                alert(err.response.data.message)
            })
        },
        fetchNews(){
            if(this.count <= (this.page-1)*this.size){
                this.page = 1;
            }
            if(this.categoryId !== 0){
                this.$axios.get(`/api/news/category/page/${this.categoryId}`, {params: {
                        start: this.page-1,
                        size: this.size
                    }}).then((response) => {
                    this.count = response.data.count;
                    this.news = response.data.data;
                });
            }else{
                this.$axios.get('/api/news/page', {params: {
                        start: this.page-1,
                        size: this.size
                    }}).then((response) => {
                    this.count = response.data.count;
                    this.news = response.data.data;
                });
            }

        },
        addNews(){
            this.$router.push({name: "AddNews"});
        },
        formatDate(createdAt){
            let date = new Date(createdAt);
            return date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
        },
        findNews(){
            let link = "http://localhost:8086/#/SingleNews/" + this.selectedNews.id
            this.$router.push(link)
        }
    },
    computed: {
        sortedNews(){
            let items = this.news
            items.sort( ( a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt);
            });
            return items;
        }
    }
}
</script>

<style scoped>

</style>
