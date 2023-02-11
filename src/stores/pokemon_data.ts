import axios from "axios"
import { defineStore } from "pinia"

interface IPokemonResponse {
  name: string
  id: number
  abilities: [
    {
      ability: {
        name: string
        url: string
      }
    }
  ]
  stats: [
    {
      base_stat: number
      effort: number
      stat: {
        name: string
      }
    }
  ]
  sprites: {
    front_default: string
  }
}

export interface IPokemon {
  id: number
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

export const usePokemon = defineStore("pokemonData", {
  state: () => {
    return {
      pokemons: [] as IPokemon[],
    }
  },
  actions: {
    async getPokemonDataEvolution(url: string) {
      return await axios.get(url).then(async (res) => {
        if (res.data.chain.evolves_to.length < 1) {
          return null
        }
        const pokemonName = res.data.chain.evolves_to[0].species.name
        return await axios
          .get<IPokemonResponse>(
            `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
          )
          .then((res) => {
            const pokemonData: any = {
              id: res.data.id,
              name: res.data.name,
              imgUrl: res.data.sprites.front_default,
            }

            res.data.stats.map((stat) => {
              pokemonData[stat.stat.name] = stat.base_stat
            })

            return pokemonData
          })
      })
    },

    async getPokemonEvolutionUrl(name: string) {
      return await axios
        .get(`https://pokeapi.co/api/v2/pokemon-species/${name}/`)
        .then(async (res) =>
          this.getPokemonDataEvolution(res.data.evolution_chain.url)
        )
    },

    async getPokemonData(name: string) {
      const pokemon = await axios
        .get<IPokemonResponse>(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(async (res) => {
          const pokemonData: any = {
            id: res.data.id,
            name: res.data.name,
            imgUrl: res.data.sprites.front_default,
            evolution: await this.getPokemonEvolutionUrl(name),
          }

          res.data.stats.map((stat) => {
            pokemonData[stat.stat.name] = stat.base_stat
          })

          return pokemonData
        })

      const pokemonAlreadyExists = this.pokemons.find(
        (p) => p.name === pokemon.name
      )

      if (!pokemonAlreadyExists) {
        this.pokemons.push(pokemon)
      }
    },
  },
})
