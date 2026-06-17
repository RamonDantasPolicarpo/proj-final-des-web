<template>
  <div>
    <nav>
      <router-link to="/">
        <img src="/img/logo_tburguer.png" />
      </router-link>
      <router-link to="/catalogo">Catálogo</router-link> |
      <router-link to="/pedidos">Pedidos</router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: "NavBarComponent",
};
</script>

<style scoped>
</style>
