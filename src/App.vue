<template>
  <NavBarComponent />
  <BannerComponent />
  <router-view />
</template>

<script>
import BannerComponent from "./components/BannerComponent.vue";
import NavBarComponent from "./components/NavBarComponent.vue";
export default {
  name: "App",
  components: {
    NavBarComponent,
    BannerComponent,
  },
};
</script>

<style>
</style>