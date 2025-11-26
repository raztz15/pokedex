import { useState } from 'react'
import { REGIONS, type RegionConfig } from '../interfaces/Regions';
import { Box, Grid, Typography, AppBar, Toolbar, Container, Button, IconButton } from '@mui/material';
import { Pokemons } from './Pokemons';
import { useNavigate } from 'react-router-dom';
import FavoriteIcon from "@mui/icons-material/Favorite";
import { RegionCard } from './RegionCard';


export const RegionDashboard = () => {
    const [selectedRegion, setSelectedRegion] = useState<RegionConfig | null>();
    const navigate = useNavigate()

    const totalRegions = REGIONS.filter(region => region.id !== 'special').length;
    const totalPokemon = REGIONS[totalRegions - 1].endId;

    const handleSelect = (region: RegionConfig) => {
        setSelectedRegion(region)
    }

    const handleBackToRegions = () => {
        window.scroll({ top: 0, behavior: 'smooth' })
        setSelectedRegion(null);
    }


    return (
        <Box sx={{
            minHeight: "100vh",
            bgcolor: "#f7f7f7",
            backgroundImage: "radial-gradient(circle at 1px 1px, #ddd 1px, transparent 0)",
            backgroundSize: "40px 40px",
        }}>
            <AppBar position="sticky" elevation={2}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Pokédex Dashboard
                    </Typography>

                    <Button color='inherit' onClick={() => navigate('/search')}>
                        Search
                    </Button>

                    <IconButton color="inherit" onClick={() => navigate("/favorites")}>
                        <FavoriteIcon />
                    </IconButton>
                </Toolbar>

            </AppBar>

            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Typography variant="h4" fontWeight={700} gutterBottom>
                    Regions
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Choose a region to explore its Pokémon.
                </Typography>

                <Box
                    sx={{
                        mb: 3,
                        p: 2,
                        borderRadius: 3,
                        bgcolor: "background.paper",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 2,
                    }}
                >
                    <Box>
                        <Typography variant="caption" color="text.secondary">
                            Total regions
                        </Typography>
                        <Typography variant="subtitle1" fontWeight={600}>
                            {totalRegions}
                        </Typography>
                    </Box>

                    <Box>
                        <Typography variant="caption" color="text.secondary">
                            Total Pokémon
                        </Typography>
                        <Typography variant="subtitle1" fontWeight={600}>
                            {totalPokemon}
                        </Typography>
                    </Box>

                    {selectedRegion && (
                        <Box>
                            <Typography variant="caption" color="text.secondary">
                                Selected region
                            </Typography>
                            <Typography variant="subtitle1" fontWeight={600}>
                                {selectedRegion.label}
                            </Typography>
                        </Box>
                    )}
                </Box>

                <Grid container spacing={4} justifyContent={'center'}>
                    {REGIONS.map(region => (
                        <Grid key={region.id}>
                            <RegionCard region={region} handleSelect={handleSelect} />
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {selectedRegion && <Pokemons
                limit={selectedRegion.endId
                    - selectedRegion.startId + 1}
                offset={selectedRegion.startId - 1}
                region={selectedRegion}
                onBackToRegions={handleBackToRegions}
            />}
        </Box>
    )
}
