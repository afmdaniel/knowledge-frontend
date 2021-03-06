<template>
    <div class="user-admin">
        <b-form>
            <input type="hidden" id="user-id" v-model="user.id" />
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Nome" label-for="user-name">
                        <b-form-input :readonly="mode === 'remove' ? true : false"
                            id="user-name" type="text"
                            v-model="user.name" required
                            placeholder="Informe o nome do usuário">
                        </b-form-input>
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="E-mail" label-for="user-email">
                        <b-form-input :readonly="mode === 'remove' ? true : false"
                            id="user-email" type="text"
                            v-model="user.email" required
                            placeholder="Informe o e-mail do usuário">
                        </b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <template v-if="!(mode == 'remove')">
                <b-form-checkbox id="user-admin" v-model="user.admin" class="mb-3">
                    Administrador
                </b-form-checkbox>
                <b-row>
                    <b-col md="6" sm="12">
                        <b-form-group label="Senha" label-for="user-password">
                            <b-form-input id="user-password" type="password"
                                v-model="user.password" required 
                                placeholder="Informe a senha do usuário">
                            </b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col md="6" sm="12">
                        <b-form-group label="Confirmação de senha" label-for="user-confirm-password">
                            <b-form-input id="user-confirm-password" type="password"
                                v-model="user.confirmPassword" required
                                placeholder="Confirme a senha do usuário">
                            </b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>
            </template>
            <b-button variant="primary" v-if="mode === 'save'"
                @click="save">Salvar</b-button>
            <b-button variant="danger" v-if="mode === 'remove'"
                @click="remove">Excluir</b-button>
            <b-button class="ml-2" @click="reset">Cancelar</b-button>
        </b-form>
        <hr>
        <b-table :busy="isBusy" responsive striped primary-key="id" :items="users" :fields="fields">
            <template slot="table-busy">
                <div class="text-center text-danger my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong>Loading...</strong>
                </div>
            </template>
            <template slot="cell(actions)" slot-scope="data">
                <b-button variant="warning" @click="loadUser(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadUser(data.item, 'remove')" class="mr-2">
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>
    </div>
</template>

<script>
import api from "@/services/api"
import { showError } from '@/config/toastMsgs'

const UserAdmin = {
    name: "UserAdmin",
    data: function() {
        return {
            mode: "save",
            isBusy: false,
            user: {},
            users: [],
            fields: [
                { key: "id", label: "Código", sortable: true },
                { key: "name", label: "Nome", sortable: true },
                { key: "email", label: "E-mail", sortable: false },
                {
                    key: "admin",
                    label: "Administrador",
                    sortable: true,
                    formatter: value => (value ? "Sim" : "Não")
                },
                { key: "actions", label: "Ações" }
            ]
        }
    },
    methods: {
        async loadUsers() {
            this.toggleBusy()
            const res = await api.get("/users")
            this.toggleBusy()
            this.users = res.data
        },
        reset() {
            this.mode = 'save'
            this.user = {}
            this.loadUsers()
        },
        async save() {
            const method = this.user.id ? 'put' : 'post'
            const id = this.user.id ? `/${this.user.id}` : ''
            try {
                await api[method](`/users${id}`, this.user)
                this.$toasted.global.defaultSuccess()
                this.reset()
            } catch (err) {
                showError(err)
            }
        },
        async remove() {
            try {
                const id = this.user.id
                await api.delete(`/users/${id}`)
                this.$toasted.global.defaultSuccess()
                this.reset()
            } catch (err) {
                showError(err)
            }
            
        },
        loadUser(user, mode = 'save') {
            this.mode = mode
            this.user = { ...user }
        },
        toggleBusy() {
            this.isBusy = !this.isBusy
        }
    },
    mounted() {
        this.loadUsers()
    }
}

export default UserAdmin
</script>

<style>

</style>