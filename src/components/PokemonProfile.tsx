import { Box, Divider, Tabs, Tab } from '@mui/material';
import type { Pokemon, PokemonSpecies } from '../interfaces/PokemonRealtedInterfaces';
import { PokemonProfileHeader } from './PokemonProfileHeader';
import { useState } from 'react';
import { PokemomBasicInfo } from './PokemomBasicInfo';
import { PokemonBattleInfo } from './PokemonBattleInfo';
import { PokemonMoves } from './PokemonMoves';
import { getPokemonRegion } from '../utils';

interface PokemonProfileProps {
    pokemon: Pokemon;
    species?: PokemonSpecies;
}

export const PokemonProfile = ({ pokemon, species }: PokemonProfileProps) => {
    const { id, name, types, stats, sprites, abilities, height, weight, base_experience } =
        pokemon;

    const [tab, setTab] = useState<'about' | 'battle' | 'moves'>('about');

    const region = getPokemonRegion(id);
    const regionLabel = region?.label ?? 'Unknown';

    const genus =
        species?.genera.find((g) => g.language.name === "en")?.genus ?? "";

    console.log({ genus: species?.genera });


    const flavorText = species?.flavor_text_entries.find(f => f.language.name === 'en')
        ?.flavor_text.replace(/\f/g, ' ')
        .replace(/\s+/g, " ") ?? '';

    const handleTabChange = (_: React.SyntheticEvent, value: string) => {
        setTab(value as typeof tab)
    }


    return (
        <Box sx={{ p: 3, pb: 4, display: "flex", flexDirection: "column", gap: 2, overflowY: 'auto' }}>
            <PokemonProfileHeader id={id} name={name} sprites={sprites} types={types} species={species} />

            <Divider sx={{ my: 2 }} />

            <Tabs
                value={tab}
                onChange={handleTabChange}
                variant='fullWidth'
                sx={{ mb: 2 }}
            >
                <Tab label='About' value='about' />
                <Tab label='Battle' value='battle' />
                <Tab label='Moves' value='moves' />
            </Tabs>

            {/* Basic info */}
            {tab === 'about' &&
                <PokemomBasicInfo
                    base_experience={base_experience}
                    height={height}
                    weight={weight}
                    region={regionLabel}
                    genus={genus}
                    flavorText={flavorText}
                />}

            {/* Abilities */}
            {tab === 'battle' && <PokemonBattleInfo abilities={abilities} stats={stats} pokemon={pokemon} />}

            {/* --- Level-up Moves (Scarlet/Violet) --- */}
            {tab === 'moves' && <PokemonMoves pokemon={pokemon} />}
        </Box>
    )
}
