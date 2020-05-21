<template>
    <div class="articles-by-category">
        <PageTitle icon="fa fa-folder-o" :main="category.name" sub="Categoria" />
        <ul>
            <li v-for="article in articles" :key="article.id">
                <ArticleItem :article="article" />
            </li>
        </ul>
        <div class="load-more">
            <button v-if="loadMore" class="btn btn-lg btn-outline-primary" @click="getArticles">
                Carregar mais artigos
            </button>
        </div>
    </div>
</template>

<script>
import api from '@/services/api'
import PageTitle from '../template/PageTitle'
import ArticleItem from './ArticleItem'

const ArticlesByCategory = {
    name: "ArticlesByCategory",
    components: {
        PageTitle,
        ArticleItem
    },
    data: function () {
        return {
            category: {},
            articles: [],
            page: 1,
            loadMore: true
        }
    },
    methods: {
        async getCategory() {
            const res = await api.get(`/categories/${this.category.id}`)
            this.category = res.data
        },
        async getArticles() {
            const res = await api.get(`/categories/${this.category.id}/articles?page=${this.page}`)
            this.articles = this.articles.concat(res.data)
            this.page++

            if(res.data.length === 0) this.loadMore = false
        }  
    },
    mounted() {
        this.category.id = this.$route.params.id
        this.getCategory()
        this.getArticles()
    }
}

export default ArticlesByCategory
</script>

<style>
    .articles-by-category ul {
        list-style-type: none;
        padding: 0px;
    }

    .articles-by-category .load-more {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 25px;
    }
</style>