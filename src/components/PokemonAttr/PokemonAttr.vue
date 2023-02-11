<script lang="ts">
import { RouterLink } from "vue-router"
import "./style.sass"

export default {
  props: ["pokemon"],
  components: { RouterLink },
}
</script>

<template>
  <div class="wrapper">
    <div class="img">
      <img :src="pokemon.imgUrl" />
      <RouterLink :to="'/pokemon/' + pokemon.name">
        <h1>{{ pokemon.name }}</h1>
      </RouterLink>
    </div>

    <ul class="data">
      <li>HP: {{ pokemon.hp }}</li>
      <li>Attack: {{ pokemon.attack }}</li>
      <li>Defense: {{ pokemon.defense }}</li>
      <li>Special Attack: {{ pokemon["special-attack"] }}</li>
      <li>Special Defense: {{ pokemon["special-defense"] }}</li>
      <li>Speed: {{ pokemon.speed }}</li>
    </ul>
  </div>
</template>
