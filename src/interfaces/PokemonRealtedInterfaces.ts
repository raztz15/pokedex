export interface NamedAPIResource {
    name: string;
    url: string;
}

// This one is the **API shape** (snake_case)
export interface Pokemon {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    is_default: boolean;
    order: number;
    weight: number;

    abilities: PokemonAbility[];
    forms: NamedAPIResource[];
    game_indices: VersionGameIndex[];
    held_items: PokemonHeldItem[];

    location_area_encounters: string;

    moves: PokemonMove[];

    past_types: PokemonTypePast[];
    // I'm not sure past_abilities actually exists in PokeAPI; make it optional
    past_abilities?: PokemonAbilityPast[];

    sprites: PokemonSprites;
    cries: PokemonCries;

    species: NamedAPIResource;

    stats: PokemonStat[];
    types: PokemonType[];
}

export interface PokemonAbility {
    is_hidden: boolean;
    slot: number;
    ability: NamedAPIResource; // /ability/{id or name}
}

export interface PokemonAbilityPast {
    generation: NamedAPIResource; // /generation/{id or name}
    abilities: PokemonAbility[];
}

export interface PokemonType {
    slot: number;
    type: NamedAPIResource; // /type/{id or name}
}

// -------- Types --------

export interface PokemonTypePast {
    generation: NamedAPIResource;
    types: PokemonType[];
}

// -------- Game indices --------

export interface VersionGameIndex {
    game_index: number;
    version: NamedAPIResource; // /version/{id or name}
}

// -------- Held items --------

export interface PokemonHeldItem {
    item: NamedAPIResource; // /item/{id or name}
    version_details: PokemonHeldItemVersion[];
}


export interface PokemonHeldItemVersion {
    version: NamedAPIResource; // /version/{id or name}
    rarity: number;
}

// -------- Moves --------
export interface PokemonMove {
    move: NamedAPIResource; // /move/{id or name}
    version_group_details: PokemonMoveVersion[];
}

export interface PokemonMoveVersion {
    move_learn_method: NamedAPIResource; // /move-learn-method/{id or name}
    version_group: NamedAPIResource;     // /version-group/{id or name}
    level_learned_at: number;
    order: number;
}

// -------- Stats --------

export interface PokemonStat {
    stat: NamedAPIResource; // /stat/{id or name}
    effort: number;
    base_stat: number;
}

// -------- Sprites & Cries --------

export interface PokemonSprites {
    front_default: string | null;
    front_shiny: string | null;
    front_female: string | null;
    front_shiny_female: string | null;
    back_default: string | null;
    back_shiny: string | null;
    back_female: string | null;
    back_shiny_female: string | null;

    other?: {
        [key: string]: {
            front_default: string | null;
            front_female?: string | null;
            front_shiny?: string | null;
            front_shiny_female?: string | null;
        };
    };

    versions?: {
        [generation: string]: {
            [game: string]: {
                front_default: string | null;
                front_female?: string | null;
                front_shiny?: string | null;
                front_shiny_female?: string | null;
            };
        };
    };
}

export interface PokemonCries {
    latest: string | null;
    legacy: string | null;
}

export interface Language {
    name: string;
    url: string;
}

export interface PokemonGenera {
    genus: string;
    language: Language;
}

export interface PokemonSpecies {
    id: number;
    name: string;
    flavor_text_entries: {
        flavor_text: string;
        language: Language;
        version: { name: string };
    }[];
    generation: {
        name: string; // e.g. "generation-i"
    } | null;
    habitat: {
        name: string; // e.g. "forest"
    } | null;
    capture_rate: number;
    genera: PokemonGenera[];
}

export interface TypeDetails {
    name: string;
    damage_relations: {
        double_damage_from: NamedAPIResource[];
        half_damage_from: NamedAPIResource[];
        no_damage_from: NamedAPIResource[];

        double_damage_to: NamedAPIResource[];
        half_damage_to: NamedAPIResource[];
        no_damage_to: NamedAPIResource[];
    };
}

export interface MoveDetails {
    id: number;
    name: string;
    accuracy: number | null;
    power: number | null;
    pp: number | null;
    priority: number;
    type: NamedAPIResource; // { name: "fire", url: "..." }
    damage_class: NamedAPIResource; // { name: "physical" | "special" | "status", ... }
}