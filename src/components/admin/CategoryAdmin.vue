<template>
    <div class="category-admin">
        <b-form>
            <input type="hidden" id="category-id" v-model="category.id" />
            <b-form-group label="Nome" label-for="category-name">
                <b-form-input :readonly="mode === 'remove' ? true : false"
                    id="category-name" type="text"
                    v-model="category.name" required
                    placeholder="Informe o nome da categoria">
                </b-form-input>
            </b-form-group>
            <b-form-group label="Categoria Pai" label-for="category-parentId">
                <b-form-select v-if="mode !== 'remove'" id="category-parentId"
                    v-model="category.parentId" :options="categories">
                    <template slot="first">
                        <b-form-select-option :value="null" disabled>
                            -- Selecione a Categoria Pai --
                        </b-form-select-option>
                    </template>
                </b-form-select>
                <b-form-input v-else id="category-parentId" 
                    v-model="category.path" readonly />
            </b-form-group>
            <b-button variant="primary" v-if="mode === 'save'"
                @click="save">Salvar</b-button>
            <b-button variant="danger" v-if="mode === 'remove'"
                @click="remove">Excluir</b-button>
            <b-button class="ml-2" @click="reset">Cancelar</b-button>
        </b-form>
        <hr>
        <b-table :busy="isBusy" responsive striped primary-key="id" :items="categories" :fields="fields">
            <template slot="table-busy">
                <div class="text-center text-danger my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong>Loading...</strong>
                </div>
            </template>
            <template slot="cell(actions)" slot-scope="data">
                <b-button variant="warning" @click="loadCategory(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadCategory(data.item, 'remove')" class="mr-2">
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>
    </div>
</template>

<script>
import api from '@/services/api'
import { showError } from '@/config/toastMsgs'

const CategoryComponent = {
    name: "CategoryComponent",
    data: function() {
        return {
            mode: "save",
            isBusy: false,
            category: { parentId: null },
            categories: [],
            fields: [
                { key: "id", label: "Código", sortable: true },
                { key: "name", label: "Nome", sortable: true },
                { key: "path", label: "Caminho", sortable: true },
                { key: "actions", label: "Ações" }
            ]
        }
    },
    methods: {
        async loadCategories() {
            const res = await api.get("/categories")
            this.categories = res.data.map(category => {
                return { ...category, value: category.id, text: category.path }
            })
        },
        reset() {
            this.mode = 'save'
            this.category = { parentId: null }
            this.loadCategories()
        },
        async save() {
            const method = this.category.id ? 'put' : 'post'
            const id = this.category.id ? `/${this.category.id}` : ''
            try {
                await api[method](`/categories${id}`, { ...this.category })
                this.$toasted.global.defaultSuccess()
                this.reset()
            } catch (err) {
                showError(err)
            }
        },
        async remove() {
            try {
                const id = this.category.id
                await api.delete(`/categories/${id}`)
                this.$toasted.global.defaultSuccess()
                this.reset()
            } catch (err) {
                showError(err)
            }
            
        },
        loadCategory(category, mode = 'save') {
            this.mode = mode
            this.category = { ...category }
        },
        toggleBusy() {
            this.isBusy = !this.isBusy
        }
    },
    mounted() {
        this.toggleBusy()
        this.loadCategories()
        this.toggleBusy()
    }
}

export default CategoryComponent
</script>

<style>

</style>