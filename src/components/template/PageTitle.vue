<template>
  <div class="page-title">
      <h1><i v-if="icon" :class="icon"></i> {{ main }}</h1>
      <h2>{{ sub }}</h2>
      <hr>
  </div>
</template>

<script>
const PageTitle = {
    name: 'PageTitle',
    props: ['icon', 'main', 'sub']
}

export default PageTitle
</script>

<style>
    .page-title h1 {
        margin: 0px;
    }
    
    .page-title h1 {
        color: #777;
        margin-top: 5px;
        font: 1.3rem
    }
</style>