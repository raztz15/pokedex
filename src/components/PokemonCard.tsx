import { Box, Card, CardActionArea, CardContent, CardMedia, Chip, Typography } from '@mui/material';
import type { RegionConfig } from '../interfaces/Regions';
import { getPaddedId } from '../utils';
import StarIcon from "@mui/icons-material/Star";
import { useFavorite } from '../hooks/useFavorite';

interface PokemonCardProps {
    id: string;
    name: string;
    onClick?: (id: string) => void;
    region?: RegionConfig
}

export const PokemonCard = ({ id, name, region, onClick }: PokemonCardProps) => {
    const { favoriteIds } = useFavorite()

    const isFavorite = favoriteIds.includes(Number(id))

    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

    const handleClick = () => {
        onClick?.(id); // always call with the id, not the mouse event
    };

    return (
        <Card
            elevation={3}
            sx={{
                position: 'relative',
                borderRadius: 3,
                overflow: "hidden",
                minWidth: '250px',
                background:
                    "linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(245,245,245,1) 100%)",
            }}
        >
            {isFavorite && (
                <Box
                    sx={{
                        position: 'absolute',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        top: 6,
                        right: 6,
                        bgcolor: 'rgba(0,0,0,0.03)',
                        borderRadius: '50%',
                        p: .3,
                        zIndex: 10,
                    }}
                >
                    <StarIcon fontSize='small' sx={{ color: '#ffd600' }} />
                </Box>
            )}
            <CardActionArea
                onClick={handleClick}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "stretch",
                    height: "100%",
                }}
            >
                <CardMedia
                    component="img"
                    image={imageUrl}
                    alt={name}
                    sx={{
                        width: "100%",
                        height: 120,
                        objectFit: "contain",
                        backgroundColor: "#f5f5f5",
                    }}
                />

                <CardContent sx={{ flexGrow: 1 }}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "baseline",
                            mb: 1,
                        }}
                    >
                        <Typography
                            variant="subtitle1"
                            textTransform="capitalize"
                            fontWeight={600}
                        >
                            {name}
                        </Typography>
                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >{`#${getPaddedId(id)}`}</Typography>
                    </Box>
                    {/* // TODO ---> FIX THIS */}
                    {region && <Chip size="small" label={region.label} color="success" sx={{ textTransform: 'capitalize' }} />}
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
