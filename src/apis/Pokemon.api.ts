// pokemonApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { type TypeDetails, type NamedAPIResource, type Pokemon, type PokemonSpecies, type MoveDetails } from "../interfaces/PokemonRealtedInterfaces";

// ---- List response for /pokemon?offset=...&limit=... ----

export interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: NamedAPIResource[]; // each has name + url
}

export const pokemonApi = createApi({
    reducerPath: 'pokemonApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
    endpoints: builder => ({
        // TODO ---> clarify the types of the query
        getPokemons: builder.query<PokemonListResponse, { limit: number; offset: number }>({
            query: ({ limit, offset }) => `/pokemon?offset=${offset}&limit=${limit}`
        }),
        getAllPokemons: builder.query<PokemonListResponse, void>({
            query: () => '/pokemon?offset=0&limit=2000'
        }),
        getOnePokemon: builder.query<Pokemon, number | string>({
            query: (idOrName) => `/pokemon/${idOrName}`
        }),
        getPokemonSpecies: builder.query<PokemonSpecies, string | number>({
            query: (idOrName) => `pokemon-species/${idOrName}`
        }),
        getTypedDetails: builder.query<TypeDetails, string>({
            query: (typeName) => `/type/${typeName}`
        }),
        getMoveDetails: builder.query<MoveDetails, string>({
            query: (moveName) => `/move/${moveName}`
        })
    })
})

export const {
    useGetPokemonsQuery,
    useGetOnePokemonQuery,
    useGetPokemonSpeciesQuery,
    useGetTypedDetailsQuery,
    useGetMoveDetailsQuery,
    useGetAllPokemonsQuery
} = pokemonApi;