import { useState } from 'react'
import { REGIONS, type RegionConfig } from '../interfaces/Regions';
import { Box, Card, CardActionArea, CardContent, Grid, Typography, AppBar, Toolbar, Container, Button, IconButton } from '@mui/material';
import { Pokemons } from './Pokemons';
import { useNavigate } from 'react-router-dom';
import FavoriteIcon from "@mui/icons-material/Favorite";


export const RegionDashboard = () => {
    const [selectedRegion, setSelectedRegion] = useState<RegionConfig | null>();
    const navigate = useNavigate()

    const totalRegions = REGIONS.length;
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
            <AppBar position="static" elevation={2}>
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

                <Grid container spacing={2}>
                    {REGIONS.map(region => (
                        <Grid key={region.id}>
                            <Card
                                elevation={3}
                                sx={{
                                    borderRadius: 4,
                                    boxShadow: '0 4px 8px rgba(0,0,0,0.08)',
                                    '&:hover': {
                                        boxShadow: "0 6px 14px rgba(0,0,0,0.12)",
                                        transform: "translateY(-3px)",
                                    },
                                    transition: '0.2 ease',
                                    bgcolor: region.color
                                }}
                            >
                                <CardActionArea
                                    onClick={() => handleSelect(region)}
                                    sx={{
                                        p: 1,
                                        "&:hover": {
                                            transform: "translateY(-2px)",
                                        },
                                        transition: "transform 0.15s ease-out",
                                    }}>
                                    <CardContent
                                        sx={{
                                            minHeight: 160,
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        {/* Top row: emoji + title */}
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                mb: 1,
                                            }}
                                        >
                                            <Typography
                                                variant="h2"
                                                component="div"
                                                sx={{ textAlign: 'center', mb: 1, opacity: .9, lineHeight: 1.1 }}
                                            >
                                                {region.emoji}
                                            </Typography>

                                            <Box sx={{ textAlign: "center", mb: 1 }}>
                                                <Typography variant="h6" fontWeight={700}>
                                                    {region.label}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    {region.generation.replace("generation-", "Gen ").toUpperCase()}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        {/* Tagline */}
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ mb: 1 }}
                                        >
                                            {region.tagline}
                                        </Typography>

                                        {/* Range */}
                                        <Typography variant="caption" color="text.secondary">
                                            #{region.startId}–{region.endId} Pokémon
                                        </Typography>
                                    </CardContent>

                                </CardActionArea>
                            </Card>
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
