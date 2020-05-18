<template>
    <div class="home">
        <PageTitle icon="fa fa-home" main="Home" sub="Base de Conhecimento" />
        <div class="stats-group flex-column flex-lg-row">
            <Stat title="Categorias" :value="stat.categories" icon="fa fa-folder" color='#d54d50' />
            <Stat title="Artigos" :value="stat.articles" icon="fa fa-file" color='#3bc480' />
            <Stat title="Usuários" :value="stat.users" icon="fa fa-user" color='#3282cd' />
        </div>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import Stat from './Stat'
import api from '@/services/api'

const Home = {
    name: 'Home',
    components: {
        PageTitle,
        Stat
    },
    data: function () {
        return {
            stat: {}
        }
    },
    methods: {
        async getStats() {
            const res = await api.get('/stats')
            this.stat = res.data
        }
    },
    mounted() {
        this.getStats()
    }
}


export default Home
</script>

<style>
    .stats-group {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
</style>