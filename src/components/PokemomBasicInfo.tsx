import { Box, Typography } from '@mui/material'
import { InfoChip } from './InfoChip';

interface PokemonBasicInforProps {
    height: number;
    weight: number;
    base_experience: number;
    region: string;
    genus: string;
    flavorText: string;
}

export const PokemomBasicInfo = ({ height, weight, base_experience, region, genus, flavorText }: PokemonBasicInforProps) => {
    const heightMeters = (height / 10).toFixed(1);
    const weightKg = (weight / 10).toFixed(1);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <InfoChip label="Region" value={region} />
                <InfoChip label="Species" value={genus} />
                <InfoChip label="Height" value={`${heightMeters} m`} />
                <InfoChip label="Weight" value={`${weightKg} kg`} />
                <InfoChip label="Base XP" value={base_experience} />
            </Box>
            {flavorText && (
                <Box sx={{ mt: 1 }}>
                    <Typography variant="subtitle2" gutterBottom>
                        Pokédex entry
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {flavorText}
                    </Typography>
                </Box>
            )}
        </Box>
    )
}
