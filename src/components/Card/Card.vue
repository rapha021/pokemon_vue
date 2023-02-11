<script lang="ts">
import "./style.sass"
import { usePokemon } from "@/stores/pokemon_data"
import PokemonAttr from "../PokemonAttr/PokemonAttr.vue"

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
    await this.getPokemon()
  },
  components: { PokemonAttr },
  watch: {
    async "$route.params"(to, from) {
      this.pokemon.name = this.$route.params.name as string
      await this.getPokemon()
    },
  },
  methods: {
    async getPokemon() {
      const pokemon = usePokemon()
      await pokemon.getPokemonData(this.pokemon.name)
      const pokemonData = pokemon.pokemons.filter(
        (p) => p.name === this.pokemon.name
      )[0]

      this.pokemon = {
        ...this.pokemon,
        ...pokemonData,
      }
    },
  },
}
</script>

<template>
  <div class="container">
    <section class="pokemon-wrap">
      <RouterLink to="/">
        <button>Voltar para Home</button>
      </RouterLink>
      <div class="wrapper">
        <PokemonAttr :pokemon="pokemon" />
        <PokemonAttr v-if="pokemon.evolution" :pokemon="pokemon.evolution" />
      </div>
    </section>
  </div>
</template>
