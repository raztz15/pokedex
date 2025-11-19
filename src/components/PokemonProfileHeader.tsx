import { Box, Chip, Stack, Typography } from '@mui/material'
import type { PokemonSpecies, PokemonSprites, PokemonType } from '../interfaces/PokemonRealtedInterfaces';
import { getPaddedId } from '../utils';

interface PokemonProfuleHeaderProps {
    id: number;
    sprites: PokemonSprites;
    species?: PokemonSpecies;
    types: PokemonType[]
    name: string;

}
export const PokemonProfileHeader = ({ id, sprites, species, types, name }: PokemonProfuleHeaderProps) => {

    const artwork =
        sprites.other?.["official-artwork"]?.front_default ??
        sprites.front_default ??
        "";

    let flavorText: string | null = null;
    let generationLabel: string | null = null;
    let habitatLabel: string | null = null;
    let captureRate: number | null = null;

    if (species) {
        const englishEntry = species.flavor_text_entries.find(entry => entry.language.name === 'en')
        if (englishEntry) {
            flavorText = englishEntry.flavor_text.replace(/[\n\f]/g, " ").trim();
        }

        if (species.generation) {
            const rawGen = species.generation.name;
            const parts = rawGen.split('-');
            const roman = parts[1]?.toUpperCase() ?? '';
            generationLabel = `Generarion ${roman}`
        }

        if (species.habitat) {
            habitatLabel = species.habitat.name.charAt(0).toUpperCase() + species.habitat.name.slice(1);
        }

        captureRate = species.capture_rate;
    };

    return (
        <>
            {/* Header */}
            < Box sx={{ textAlign: "center" }
            }>
                <Typography variant="h5" textTransform="capitalize" fontWeight={700}>
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    #{getPaddedId(id)}
                </Typography>

                {
                    artwork && (
                        <Box
                            sx={{
                                mt: 2,
                                mb: 1,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Box
                                component="img"
                                src={artwork}
                                alt={name}
                                sx={{
                                    width: 180,
                                    height: 180,
                                    objectFit: "contain",
                                    borderRadius: "50%",
                                    background:
                                        "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9) 0%, rgba(225,245,254,1) 55%, rgba(179,229,252,1) 100%)",
                                }}
                            />
                        </Box>
                    )
                }

                <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="center"
                    flexWrap="wrap"
                    sx={{ mt: 1 }}
                >
                    {types.map((t) => (
                        <Chip
                            key={t.slot}
                            label={t.type.name}
                            size="small"
                            sx={{ textTransform: "capitalize" }}
                            color="primary"
                            variant="outlined"
                        />
                    ))}
                </Stack>
                {
                    species && (
                        <Box
                            sx={{
                                mt: 1,
                                p: 2,
                                borderRadius: 2,
                                bgcolor: 'rgba(25, 118, 210, 0.04)'
                            }}
                        >
                            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                                Species Info
                            </Typography>

                            {flavorText && (
                                <Typography variant="body2" sx={{ mb: 1.5 }}>
                                    {flavorText}
                                </Typography>
                            )}
                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
                                {generationLabel && (
                                    <Box>
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                            display="block"
                                        >
                                            Generation
                                        </Typography>
                                        <Typography variant="body2" fontWeight={600}>
                                            {generationLabel}
                                        </Typography>
                                    </Box>
                                )}

                                {habitatLabel && (
                                    <Box>
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                            display="block"
                                        >
                                            Habitat
                                        </Typography>
                                        <Typography variant="body2" fontWeight={600}>
                                            {habitatLabel}
                                        </Typography>
                                    </Box>
                                )}

                                {captureRate !== null && (
                                    <Box>
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                            display="block"
                                        >
                                            Capture Rate
                                        </Typography>
                                        <Typography variant="body2" fontWeight={600}>
                                            {captureRate}
                                        </Typography>
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    )
                }

            </Box >
        </>
    )
}
