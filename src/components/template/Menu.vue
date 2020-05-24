<template>
    <aside class="menu" v-show="isMenuVisible">
        <div class="menu-filter">
            <i class="fa fa-search fa-lg"></i>
            <input type="text" placeholder="Filtrar Categoria..."
                v-model="treeFilter" class="filter-field">
        </div>
        <Tree :data="treeData" :options="treeOptions"
            :filter="treeFilter" ref="tree" />
    </aside>
</template>

<script>
import { mapState } from 'vuex'
import Tree from 'liquor-tree'
import api from '@/services/api'

const Menu = {
    name: "Menu",
    components: {
        Tree
    },
    data: function() {
        return {
            treeData: this.getTreeData(),
            treeFilter: '',
            treeOptions: {
                propertyNames: { 'text': 'name' },
                filter: { emptyText: 'Categoria não encontrada'}
            }
        }
    },
    computed: mapState(['isMenuVisible']),
    methods: {
        async getTreeData() {
            const res = await api.get('/categories/tree')
            return res.data
        },
        onNodeSelect(node) {
            this.$router.push({
                name: 'articlesByCategory',
                params: { id: node.id }
            })

            if(this.$mq === 'xs' || this.$mq === 'sm') {
                this.$store.commit('toggleMenu', false)
            }
        }
    },
    mounted() {
        this.$refs.tree.$on('node:selected', this.onNodeSelect)
    }
}

export default Menu
</script>

<style>
    .menu {
        grid-area: menu;
        background: linear-gradient(to right, #232526, #414345);

        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    }

    .menu a,
    .menu a:hover {
        color: #fff;
        text-decoration: none;
    }

    .menu .tree-node.selected > .tree-content,
    .menu .tree-node > .tree-content:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }

    .tree-arrow.has-child {
        filter: brightness(2);
    }

    .menu .menu-filter {
        display: flex;
        justify-content: center;
        align-items: center;
        
        margin: 10px;
        padding-bottom: 8px;
        border-bottom: 1px solid #AAA;
    }

    .menu .menu-filter i {
        color: #AAA;
        margin-right: 10px;
    }

    .menu input {
        color: #CCC;
        font-size: 1.1rem;
        border: 0;
        outline: 0;
        background: transparent;
    }

    .tree-filter-empty {
        color: #CCC;
        margin-left: 10px;
        font-size: 1.1rem;
    }
</style>