<script lang="ts">
import { usePokemon } from "../../stores/pokemon_data"
import "./style.sass"
import Card from "../Card/Card.vue"
import { RouterLink } from "vue-router"

export default {
  components: {
    Card,
    RouterLink,
  },
  data() {
    const pokemonState = usePokemon()
    return {
      pokemonName: "",
      pokemons: pokemonState.pokemons,
    }
  },
  methods: {
    async handleSubmit(e: Event) {
      const pokemonState = usePokemon()
      await pokemonState.getPokemonData(this.pokemonName)
      this.pokemonName = ""
    },
  },
}
</script>

<template>
  <section class="pokemon-search">
    <h1>Insira o nome do pokemon</h1>
    <form class="pokemon-form" @submit.prevent="handleSubmit">
      <input type="text" v-model="pokemonName" placeholder="Ex:. Ditto" />
      <button type="submit">Pesquisar</button>
    </form>
  </section>

  <section class="pokemon-history">
    <ul class="pokemon-list">
      <li v-for="pokemon in pokemons">
        <img :src="pokemon.imgUrl" :alt="pokemon.name + 'img'" />

        <RouterLink :to="'/pokemon/' + pokemon.name">
          {{ pokemon.name }}
        </RouterLink>
      </li>
    </ul>
  </section>
</template>
