<script lang="ts">
import "./style.sass"
import { usePokemon } from "@/stores/pokemon_data"
import PokemonListVue from "../PokemonList/PokemonList.vue"

interface IPokemon {
  name: string
  hp: number
  attack: number
  defense: number
  "special-attack": string
  "special-defense": string
  speed: number
  imgUrl: string
  evolution: IPokemon
}

export default {
  data() {
    const pokemonName = this.$route.params.name as string
    return {
      pokemon: {
        name: pokemonName,
      } as IPokemon,
    }
  },
  async mounted() {
    const pokemon = usePokemon()
    await pokemon.getPokemonData(this.pokemon.name)
    const pokemonData = pokemon.pokemons.filter(
      (p) => p.name === this.pokemon.name
    )[0]
    this.pokemon = {
      ...pokemon,
      ...pokemonData,
    }
  },
  components: { PokemonListVue },
}
</script>

<template>
  <div class="container">
    <section class="pokemon-wrap">
      <PokemonListVue :pokemon="pokemon" />
      <PokemonListVue v-if="pokemon.evolution" :pokemon="pokemon.evolution" />
    </section>
  </div>
</template>
