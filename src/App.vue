<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router"
</script>

<template>
  <RouterView />
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;

  width: 100vw;
  height: 100vh;
}
</style>
