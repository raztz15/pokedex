import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material'
import type { RegionConfig } from '../interfaces/Regions'

interface RegionCardProps {
    region: RegionConfig
    handleSelect: (region: RegionConfig) => void;
}

export const RegionCard = ({ region, handleSelect }: RegionCardProps) => {
    return (
        <Card
            elevation={3}
            sx={{
                minWidth: 300,
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
    )
}
