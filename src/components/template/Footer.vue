<template>
  <footer class="footer">
      <span>Copyright <strong>Daniel Melo</strong> © 2019-2020</span>
  </footer>
</template>

<script>
const Footer = {
    name: "Footer"
}

export default Footer
</script>

<style>
    .footer {
        grid-area: footer;
        background-color: #DDD;
        color: #333;

        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 10px;
    }
</style>