<template>
    <div class="article-admin">
        <b-form>
            <input type="hidden" id="article-id" v-model="article.id" />
            <b-form-group label="Nome" label-for="article-name">
                <b-form-input :readonly="mode === 'remove' ? true : false"
                    id="article-name" type="text"
                    v-model="article.name" required
                    placeholder="Informe o nome do Artigo">
                </b-form-input>
            </b-form-group>
            <b-form-group label="Descrição" label-for="article-description">
                <b-form-input :readonly="mode === 'remove' ? true : false"
                    id="article-description" type="text"
                    v-model="article.description" required
                    placeholder="Informe a descrição do Artigo">
                </b-form-input>
            </b-form-group>
            <template v-if="mode === 'save'">
                <b-form-group label="Imagem (URL)" label-for="article-image">
                    <b-form-input :readonly="mode === 'remove' ? true : false"
                        id="article-image" type="text"
                        v-model="article.imageUrl"
                        placeholder="Informe a URL da imagem">
                    </b-form-input>
                </b-form-group>
                <b-form-group label="Categoria" label-for="article-categoryId">
                    <b-form-select id="article-categoryId" :options="categories" v-model="article.categoryId">
                        <template slot="first">
                                <b-form-select-option :value="undefined" disabled>
                                    -- Selecione a categoria --
                                </b-form-select-option>
                        </template>
                    </b-form-select>
                </b-form-group>
                <b-form-group label="Autor" label-for="article-userId">
                    <b-form-select id="article-userId" :options="users" v-model="article.userId">
                        <template slot="first">
                            <b-form-select-option :value="undefined" disabled>
                                -- Selecione o autor --
                            </b-form-select-option>
                        </template>
                    </b-form-select>
                </b-form-group>
                <b-form-group label="Conteúdo" label-for="article-content">
                    <VueEditor
                        v-model="article.content" 
                        placeholder="Informe o conteúdo do Artigo..." />
                </b-form-group>
            </template>
            <b-button variant="primary" v-if="mode === 'save'"
                @click="save">Salvar</b-button>
            <b-button variant="danger" v-if="mode === 'remove'"
                @click="remove">Excluir</b-button>
            <b-button class="ml-2" @click="reset">Cancelar</b-button>
        </b-form>
        <hr>
        <b-table :busy="isBusy" responsive striped primary-key="id" :items="articles" :fields="fields">
            <template slot="table-busy">
                <div class="text-center text-danger my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong>Loading...</strong>
                </div>
            </template>
            <template slot="cell(actions)" slot-scope="data">
                <b-button variant="warning" @click="loadArticle(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadArticle(data.item, 'remove')" class="mr-2">
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>
        <b-pagination size="md" v-model="page"
            :total-rows="count" :per-page="limit" />
    </div>
</template>

<script>
import { VueEditor } from "vue2-editor"
import api from '@/services/api'
import { showError } from '@/config/toastMsgs'

const ArticleAdmin = {
    name: "ArticleAdmin",
    components: {
        VueEditor
    },
    data: function() {
        return {
            mode: "save",
            isBusy: false,
            article: {},
            articles: [],
            categories: [],
            users: [],
            page: 1,
            limit: 0,
            count: 0,
            fields: [
                { key: "id", label: "Código", sortable: true },
                { key: "name", label: "Nome", sortable: true },
                { key: "description", label: "Descrição" },
                { key: "actions", label: "Ações" }
            ]
        }
    },
    methods: {
        async loadArticles() {
            const res = await api.get(`/articles?page=${this.page}`)
            this.articles = res.data.data
            this.count = res.data.count
            this.limit = res.data.maxArticlesPerPage
        },
        reset() {
            this.mode = 'save'
            this.article = {}
            this.loadArticles()
        },
        async save() {
            const method = this.article.id ? 'put' : 'post'
            const id = this.article.id ? `/${this.article.id}` : ''
            try {
                await api[method](`/articles${id}`, { ...this.article })
                this.$toasted.global.defaultSuccess()
                this.reset()
            } catch (err) {
                showError(err)
            }
        },
        async remove() {
            try {
                const id = this.article.id
                await api.delete(`/articles/${id}`)
                this.$toasted.global.defaultSuccess()
                this.reset()
            } catch (err) {
                showError(err)
            }
            
        },
        async loadArticle(article, mode = 'save') {
            this.mode = mode
            const res = await api.get(`/articles/${article.id}`)
            this.article = res.data
        },
        toggleBusy() {
            this.isBusy = !this.isBusy
        },
        async loadCategories() {
            const res = await api.get('/categories')
            this.categories = res.data.map(category => {
                return { value: category.id, text: category.path }
            })
        },
        async loadUsers() {
            const res = await api.get('/users')
            this.users = res.data.map(user => {
                return { value: user.id, text: `${user.name} (${user.email})`}
            })
        }
    },
    watch: {
        page() {
            this.loadArticles()
        }
    },
    mounted() {
        this.toggleBusy()
        this.loadCategories()
        this.loadUsers()
        this.loadArticles()
        this.toggleBusy()
    }
}

export default ArticleAdmin
</script>

<style>

</style>