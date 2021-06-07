<template>
    <div v-if="!loading">
        <div class="text-start">
            <h5 style="color: red;">{{message}}</h5>
        </div>
        <div class="form-group">
            <label for="title">Title</label>
            <input v-model="news.title" required type="text" class="form-control" id="title" aria-describedby="textHelp" placeholder="Enter Title">
        </div>
        <div class="form-group">
            <label for="text">Text</label>
            <textarea v-model="news.text" required type="text" class="form-control" id="text" placeholder="Enter Text"/>
        </div>
        <div class="form-group">
            <label>Category</label>
            <multiselect v-model="selectedCategory" :options="categories" placeholder="Select one" label="name" track-by="name" @input="selectCategory"></multiselect>
        </div>
        <div class="form-group">
            <div>
                <label>Tag</label>
                <div>
                    <multiselect v-model="selectedTags" :options="tags" :taggable="true" @input="selectTag" @tag="addTag" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Select or add tag" label="keyword" track-by="keyword" :preselect-first="true">
                        <template slot="selection" slot-scope="{ values, search, isOpen }">
                            <span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} options selected</span>
                        </template>
                    </multiselect>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: "NewsForm",
    data(){
        return {
            message: "",
            categories: [],
            news: {},
            tags: [],
            loading: true,
            user: {},
            selectedCategory: null,
            selectedTags: [],
            tag: {
                keyword: ""
            }
        }
    },
    computed: {
        errMessage(){
            return this.message;
        },
    },
    methods: {
        selectTag(){
            this.news.array = this.selectedTags;
        },
        setMessage: function (message){
            this.message = message;
        },
        setNews(news){
            this.news = news;
            this.fetchData().then(response => {
                this.loading = response;
            }).catch(err => {
                this.loading = err;
                this.$router.push({name: "NewsForCategory"});
            })
        },
        fetchData(){
            return new Promise((resolve, reject) => {
                if(this.news !== undefined && this.news.id !== undefined){
                    this.$axios.get(`/api/tags/${this.news.id}`).then(response => {
                        this.selectedTags = response.data;
                        this.news.array = response.data;
                    }).catch(err => {
                        if(err.response !== undefined){
                            alert(err.response.data.message);
                            reject(true);
                        }
                    })

                    this.$axios.get(`/api/categories/find/${this.news.categoryId}`).then(response => {
                        this.selectedCategory = response.data;
                    }).catch(err => {
                        alert(err.message);
                        reject(true);
                    })
                }

                this.$axios.get("/api/categories").then( response => {
                    this.categories = Array.from(response.data);
                }).catch(err => {
                    alert(err);
                    reject(true);
                })

                this.$axios.get("/api/tags").then( response => {
                    this.tags = Array.from(response.data);
                }).catch(err => {
                    alert(err);
                    reject(true);
                })
                this.user = JSON.parse(localStorage.getItem('user'));
                this.news.userId = this.user.id;
                resolve(false);
            })

        },
        addTag (newTag) {
            const parts = newTag.split(', ');
            this.tag.keyword = parts.pop();

            if(this.tag.keyword.length < 1){
                return;
            }
            this.$axios.post("/api/tags", {
                keyword: this.tag.keyword
            }).then(response => {
                this.tags.push(response.data);
                this.tag.keyword = "";
            }).catch(err => {
                alert(err.response.data.message);
            })
        },
        selectCategory(){
            if(this.selectedCategory !== null && this.selectedCategory !== undefined){
                this.news.categoryId = this.selectedCategory.id;
            }else{
                this.news.categoryId = 0;
            }
        }
    }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>

</style>