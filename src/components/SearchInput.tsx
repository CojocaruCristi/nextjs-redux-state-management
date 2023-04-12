"use client";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { setSearch } from "@/store/searchSlice";
import PokemonTable from "./PokemonTable";
import { pokemonApi } from "@/store/pokemonApi";
import { Pokemon } from "@/types";
import { useEffect } from "react";

 const useAppDispatch: () => AppDispatch = useDispatch;
 const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const SearchInput = () => {
    const dispatch = useAppDispatch();
    const search = useAppSelector((state) => state.search.search);
    const startupPokemon = useAppSelector((state: RootState) => state.search.startupPokemon);
    const data = useAppSelector(
        (state: RootState) =>
          state.pokemonApi.queries[`search("${search}")`]?.data as Pokemon[]
      );
   
  useEffect(() => {
    dispatch(pokemonApi.endpoints.search.initiate(search));
  }, [dispatch, search]);

    return (
        <div>
            <input
             type="text"
                value={search}
                onChange={(e) => dispatch(setSearch(e.target.value))}  
            />
            <PokemonTable pokemons={search.length ? data ?? [] : startupPokemon} />
        </div>
    )
    
}

export default SearchInput;