<script setup lang="ts">
import { RouterView } from "vue-router"
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

  margin: 0 auto;

  width: 80%;
  height: 100%;

  margin-top: 90px;
}
</style>
