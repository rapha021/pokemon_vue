<script lang="ts">
import "./style.sass"

export default {
  props: ["pokemon"],
}
</script>

<template>
  <div class="img">
    <img :src="pokemon.imgUrl" />
    <h1>{{ pokemon.name }}</h1>
  </div>

  <ul class="data">
    <li>HP: {{ pokemon.hp }}</li>
    <li>Attack: {{ pokemon.attack }}</li>
    <li>Defense: {{ pokemon.defense }}</li>
    <li>Special Attack: {{ pokemon["special-attack"] }}</li>
    <li>Special Defense: {{ pokemon["special-defense"] }}</li>
    <li>Speed: {{ pokemon.speed }}</li>
  </ul>
</template>
