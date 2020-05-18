<template>
  <main class="content">
      <router-view></router-view>
  </main>
</template>

<script>
const Content = {
    name: 'Content'
}

export default Content
</script>

<style>
    .content {
        grid-area: content;
        background-color: #efefef;
        padding: 20px;
    }
</style>