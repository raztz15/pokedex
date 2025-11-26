import { useNavigate, useParams } from 'react-router-dom'
import { useGetOnePokemonQuery, useGetPokemonSpeciesQuery } from '../apis/Pokemon.api';
import { AppBar, Box, CircularProgress, Container, IconButton, Toolbar, Typography, Tooltip } from '@mui/material';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { PokemonProfile } from './PokemonProfile';
import { useFavorite } from '../hooks/useFavorite';

export const PokemonPage = () => {
    const navigate = useNavigate();
    const { idOrName } = useParams<{ idOrName: string }>();

    const { isFavorite, toggleFavorite } = useFavorite()

    const { data: pokemon, error, isLoading } = useGetOnePokemonQuery(idOrName ?? '')

    const { data: species } = useGetPokemonSpeciesQuery(pokemon?.id ?? idOrName ?? '')

    return (
        <Box
            // TODO ---> check the differences between vh % and px and all the use cases
            sx={{ minHeight: '100vh', bgcolor: '#fafafa' }}>
            <AppBar position='sticky' elevation={2}>
                <Toolbar>
                    {/* Check what's inherit means */}
                    <IconButton edge='start' color='inherit' onClick={() => navigate(-1)} sx={{ mr: 1 }}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Pokémon Profile
                    </Typography>

                    {pokemon && (
                        <Tooltip title={isFavorite(pokemon.id) ? 'Remove from favorites' : 'Add to favorites'}>
                            <IconButton color='inherit' onClick={() => toggleFavorite(pokemon.id)}>
                                {isFavorite(pokemon.id) ? <StarIcon /> : <StarBorderIcon />}
                            </IconButton>
                        </Tooltip>
                    )}
                </Toolbar>
            </AppBar>

            <Container maxWidth='md' sx={{ py: 4 }}>
                {isLoading && (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            mt: 6,
                        }}>
                        <CircularProgress />
                    </Box>
                )}

                {error && (
                    <Typography color="error" sx={{ mt: 3 }}>
                        Failed to load Pokémon data.
                    </Typography>
                )}

                {!isLoading && !error && pokemon && (
                    <PokemonProfile pokemon={pokemon} species={species} />
                )}
            </Container>
        </Box>
    )
}
