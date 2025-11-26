import { AppBar, Box, Card, CircularProgress, Container, Grid, IconButton, TextField, Toolbar, Typography } from '@mui/material'
import { useGetAllPokemonsQuery } from '../apis/Pokemon.api'
import { useNavigate } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { extractIdFromUrl, getPokemonRegion } from '../utils'
import { useDebounce } from '../hooks/useDebounce'
import { PokemonCard } from './PokemonCard'
import CloseIcon from '@mui/icons-material/Close'

export const SearchPage = () => {
    const searchValue = localStorage.getItem('searchValue')
    const navigate = useNavigate()
    const [search, setSearch] = useState<string>(searchValue ?? '');
    const { data, error, isLoading } = useGetAllPokemonsQuery()

    const debounce = useDebounce(search, 500)

    const filteredResults = useMemo(() => {
        if (!data || debounce.trim().length < 2) return [];
        const q = debounce.trim().toLowerCase();

        return data.results.filter(p => p.name.toLowerCase().includes(q))
    }, [data, debounce])


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const value = e.target.value.toLowerCase()
        setSearch(value)
        localStorage.setItem('searchValue', value)
    }

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "#fafafa" }}>
            {/* AppBar for the search page */}
            <AppBar position="static" elevation={2}>
                <Toolbar>
                    <Typography
                        variant="h6"
                        sx={{ flexGrow: 1, cursor: "pointer" }}
                        onClick={() => navigate("/")}
                    >
                        Pokédex Search
                    </Typography>

                    <TextField
                        autoFocus
                        size="small"
                        variant="outlined"
                        placeholder="Search Pokémon by name (min 2 letters)..."
                        value={search}
                        onChange={handleChange}
                        slotProps={{
                            input: {
                                endAdornment: search && (
                                    <IconButton
                                        size='small'
                                        onClick={() => {
                                            setSearch('');
                                            localStorage.removeItem('searchValue')
                                        }}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                )
                            }
                        }}
                        sx={{
                            maxWidth: 320,
                            bgcolor: "background.paper",
                            borderRadius: 1,
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 1,
                            },
                        }}
                    />
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg" sx={{ py: 4 }}>
                {/* State: loading / error / helper text */}
                {isLoading && (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            mt: 6,
                        }}
                    >
                        <CircularProgress />
                    </Box>
                )}

                {error && (
                    <Typography color="error" sx={{ mt: 3 }}>
                        Failed to load Pokémon list.
                    </Typography>
                )}

                {!isLoading && !error && search.trim().length < 2 && (
                    <Typography variant="body2" color="text.secondary">
                        Start typing at least <strong>2 letters</strong> to see results.
                    </Typography>
                )}

                {!isLoading && !error && search.trim().length >= 2 && (
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="subtitle1" sx={{ mb: 2 }}>
                            Results for "<strong>{search.trim()}</strong>" –{" "}
                            {filteredResults.length} Pokémon found
                        </Typography>

                        {filteredResults.length === 0 && (
                            <Typography variant="body2" color="text.secondary">
                                No Pokémon match this search.
                            </Typography>
                        )}

                        <Grid container spacing={2}>
                            {filteredResults.map((p) => {
                                const id = extractIdFromUrl(p.url);

                                return (
                                    <Grid key={p.name} >
                                        <Card
                                            elevation={3}
                                            sx={{
                                                borderRadius: 3,
                                            }}
                                        >
                                            <PokemonCard id={id.toString()} name={p.name} region={getPokemonRegion(id)} onClick={() => navigate(`/pokemon/${p.name}`)} />
                                        </Card>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Box>
                )}
            </Container>
        </Box>
    )
}
