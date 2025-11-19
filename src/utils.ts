import { REGIONS } from "./interfaces/Regions";

export const generationToRegion = (generation: string | null): string => {
    if (!generation) return 'Unknown';

    const map: Record<string, string> = {
        "generation-i": "Kanto",
        "generation-ii": "Johto",
        "generation-iii": "Hoenn",
        "generation-iv": "Sinnoh",
        "generation-v": "Unova",
        "generation-vi": "Kalos",
        "generation-vii": "Alola",
        "generation-viii": "Galar",
        "generation-ix": "Paldea",
    }

    return map[generation] ?? 'Unknown'
}

export const getPaddedId = (id: number | string) => {
    return id.toString().padStart(3, '0')
}

export const extractIdFromUrl = (url: string) => {
    const segments = url.split('/').filter(Boolean)
    const idStr = segments[segments.length - 1]
    return Number(idStr)
}

export const getPokemonRegion = (pokemonId: number) => {
    const region = REGIONS.find(region => pokemonId >= region.startId && pokemonId <= region.endId);
    if (region) return region;
}

export const groupPokemonByRegion = (pokemonIds: number[]) => {
    const groupedPokemon = pokemonIds.reduce<Record<string, number[]>>((groups, currId) => {
        const region = getPokemonRegion(currId)
        const regionLabel = region?.label
        if (regionLabel) {
            if (regionLabel in groups) {
                groups[regionLabel].push(currId)
            } else {
                groups[regionLabel] = [currId]
            }
        }
        return groups;
    }, {})
    return groupedPokemon
}