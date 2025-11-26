import { useEffect, useMemo, useRef, useState } from 'react';
import { useGetPokemonsQuery } from '../apis/Pokemon.api'
import { Box, Button, Container, Grid, TextField, Toolbar, Typography } from '@mui/material';
import { PokemonCard } from './PokemonCard';
import { PokemonDetailDrawer } from './PokemonDetailDrawer';
import type { RegionConfig } from '../interfaces/Regions';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';





interface PokemonsProps {
    limit: number;
    offset: number;
    region: RegionConfig;
    onBackToRegions: () => void
}

export const Pokemons = ({ limit, offset, region, onBackToRegions }: PokemonsProps) => {
    const [search, setSearch] = useState<string>('');
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [showArrow, setShowArrow] = useState<boolean>(false);
    const pokemonLIstRef = useRef<HTMLDivElement | null>(null)

    const { isLoading, error, data } = useGetPokemonsQuery({ offset, limit })

    useEffect(() => {
        if (!region) return;
        if (!data) return;
        const regionsListElement = document.getElementById('regions-list')
        if (regionsListElement) {
            const bottom = regionsListElement?.offsetTop + regionsListElement?.offsetHeight;
            window.scrollTo({ top: bottom, behavior: 'smooth' })
        }
    }, [region, data])

    useEffect(() => {
        const handleScroll = () => {
            if (!pokemonLIstRef.current) return;

            const rect = pokemonLIstRef.current.getBoundingClientRect();
            const threshold = 20;
            console.log({ rect });
            const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 20;
            if (rect.top < -threshold) {
                setShowArrow(true);
            }
            else if (atBottom) {
                setShowArrow(false);
            }
            else {
                setShowArrow(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

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

    console.log({ showArrow });


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
            <Container ref={pokemonLIstRef} maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
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
                    <Grid id='pokemon-list' container spacing={2}>
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
                <ArrowDownwardIcon
                    sx={{
                        position: 'fixed',
                        bottom: 16,
                        left: '50%',
                        cursor: 'pointer',
                        transform: showArrow
                            ? 'tanslateX(-50%) translateY(0)'
                            : 'translateX(-50%) translateY(20px)',
                        opacity: showArrow ? 1 : 0,
                        transition: 'opacity 0.35s ease-out, transform 0.35s cubic-bezier(0.25, 0.8, 0.25, 1)',
                        pointerEvents: showArrow ? 'auto' : 'none',
                    }}
                    onClick={() => window.scrollTo({
                        top: document.body.offsetHeight, behavior: 'smooth'
                    })}
                    fontSize='large'
                />
            </Container>


            {selectedId && <PokemonDetailDrawer
                selectedId={selectedId}
                onClose={handleCloseDrawer}
            />}
        </>
    )
}
