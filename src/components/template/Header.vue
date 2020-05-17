<template>
   <header class="header"></header>
</template>

<script>
const Header = {
    name: 'Header'
}

export default Header
</script>

<style>
    .header {
        grid-area: header;
        background: linear-gradient(to right, #1e469a, #49a7c1);

        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>