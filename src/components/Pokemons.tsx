import { useMemo, useState } from 'react';
import { useGetPokemonsQuery } from '../apis/Pokemon.api'
import { Box, Button, Container, Grid, TextField, Toolbar, Typography } from '@mui/material';
import { PokemonCard } from './PokemonCard';
import { PokemonDetailDrawer } from './PokemonDetailDrawer';
import type { RegionConfig } from '../interfaces/Regions';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


interface PokemonsProps {
    limit: number;
    offset: number;
    region: RegionConfig;
    onBackToRegions: () => void
}

export const Pokemons = ({ limit, offset, region, onBackToRegions }: PokemonsProps) => {
    const [search, setSearch] = useState<string>('');
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const { isLoading, error, data } = useGetPokemonsQuery({ offset, limit })

    // basic client-side filter for now
    const filteredResults = useMemo(() => {
        if (!data) return [];
        const term = search.trim().toLowerCase();
        if (!term) return data.results;
        return data.results.filter(pokemon => pokemon.name.toLowerCase().includes(term))
    }, [data, search])

    const handleCardClick = (id: string) => {
        setSelectedId(id)
    }

    const handleCloseDrawer = () => {
        setSelectedId(null)
    }

    return (
        <>
            <Box
                sx={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 10,
                    bgcolor: 'background.default',
                    pb: 1
                }}
            >

                <Toolbar sx={{ px: 0 }}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {region.label} Pokédex
                    </Typography>

                    <Button
                        size='small'
                        startIcon={<ArrowBackIcon />}
                        onClick={onBackToRegions}
                    >
                        Regions
                    </Button>
                </Toolbar>

                <Box
                    sx={{
                        mb: 2,
                        p: 2,
                        borderRadius: 3,
                        bgcolor: region.color,
                        boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
                        display: 'flex',
                        flexDirection: 'column',
                        gap: .5,
                    }}
                >
                    <Typography variant='subtitle1' fontWeight={600}>
                        {region.label} •{" "}
                        {region.generation.replace('generation-', 'Gen ').toUpperCase()}
                    </Typography>

                    <Typography variant='body2' color='text.secondary'>
                        Pokédex range: #{region.startId}–{region.endId} • Showing {limit} Pokémon
                    </Typography>
                </Box>
            </Box>
            <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                <Box
                    sx={{
                        display: "flex",
                        gap: 2,
                        mb: 3,
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography variant="h5" fontWeight={600}>
                        Pokémon List
                    </Typography>

                    <TextField
                        size="small"
                        label="Search by name"
                        variant="outlined"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Box>

                {isLoading && <Typography>Loading Pokédex…</Typography>}
                {error && <Typography color="error">Failed to load Pokémons 🥲</Typography>}

                {!isLoading && !error && data && (
                    <Grid container spacing={2}>
                        {filteredResults.map((p) => {
                            const segments = p.url.split("/").filter(Boolean);
                            const id = segments[segments.length - 1];
                            return (
                                <Grid key={p.name}                                >
                                    <PokemonCard
                                        id={id}
                                        name={p.name}
                                        onClick={handleCardClick}
                                        region={region}
                                    />
                                </Grid>
                            );
                        })}
                    </Grid>
                )}
            </Container>

            {selectedId && <PokemonDetailDrawer
                selectedId={selectedId}
                onClose={handleCloseDrawer}
            />}
        </>
    )
}
