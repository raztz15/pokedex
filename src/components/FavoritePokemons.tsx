import { useFavorite } from '../hooks/useFavorite';
import { useNavigate } from 'react-router-dom';
import { AppBar, Box, Container, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FavoritePokemonCard } from './FavoritePokemonCard';
import { groupPokemonByRegion } from '../utils';


export const FavoritePokemons = () => {
    const navigate = useNavigate();
    const { favoriteIds } = useFavorite();

    const hasFavorites = favoriteIds.length > 0;

    const groupedByRegion = groupPokemonByRegion(favoriteIds)

    return (
        <Box
            sx={{ minHeight: '100vh', bgcolor: '#fafafa' }}
        >
            <AppBar position='static' elevation={2}>
                <Toolbar>
                    <IconButton
                        edge='start'
                        color='inherit'
                        onClick={() => navigate(-1)}
                        sx={{ mr: 1 }}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        My Favorite Pokémon
                    </Typography>
                </Toolbar>
            </AppBar>

            <Container maxWidth='lg' sx={{ py: 4 }}>
                {!hasFavorites && (
                    <Box sx={{ textAlign: 'center', mt: 6 }}>
                        <Typography variant="h5" gutterBottom>
                            No favorites yet
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Tap the ⭐ on a Pokémon’s profile to add it to your favorites.
                        </Typography>
                    </Box>
                )}

                {hasFavorites && (
                    <>
                        <Typography variant="subtitle1" sx={{ mb: 2 }}>
                            You have <strong>{favoriteIds.length}</strong> favorite Pokémon.
                        </Typography>

                        {Object.entries(groupedByRegion).map(([region, pokemonIds]) => (
                            <Box key={region} sx={{ mt: 4 }}>
                                <Typography
                                    variant='h6'
                                    fontWeight={700}
                                    sx={{ mb: 2 }}
                                >
                                    {region}
                                </Typography>

                                <Grid container spacing={2}>
                                    {pokemonIds.map(id => (
                                        <Grid key={id}>
                                            <FavoritePokemonCard id={id} />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        ))}
                    </>
                )}
            </Container>
        </Box>
    )
}
