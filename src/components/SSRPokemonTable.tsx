import PokemonTable from "@/components/PokemonTable";
import { store } from "@/store";

function SSRPokemonTable() {

  return (
    <main>

      <PokemonTable pokemons={store.getState().search.startupPokemon} />
    </main>
  )
}

export default SSRPokemonTable;