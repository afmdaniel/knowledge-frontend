<template>
    <div class="article-by-id">
        <PageTitle icon="fa fa-file-o" :main="article.name" :sub="article.description" />
        <div class="article-content" v-html="article.content"></div>
    </div>
</template>

<script>
import api from '@/services/api'
import PageTitle from '../template/PageTitle'

const ArticleById = {
    name: "ArticleById",
    components: {
        PageTitle
    },
    data: function() {
        return {
            article: {}
        }
    },
    async mounted() {
        const res = await api.get(`/articles/${this.$route.params.id}`)
        this.article = res.data
    }
}

export default ArticleById
</script>

<style>
    .article-content {
        background-color: #FFF;
        border-radius: 8px;
        padding: 25px;
    }

    .article-content pre {
        padding: 20px;
        border-radius: 8px;
        background-color: #1e1e1e;
        color: #FFF;
    }

    .article-content img {
        max-width: 100%;
    }

    .article-content :last-child {
        margin-bottom: 0px;
    }
    
    .article-content .ql-align-right {
        text-align: right;
    }
    
    .article-content .ql-align-center {
        text-align: center;
    }
</style>