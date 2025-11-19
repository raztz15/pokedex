import { Box, Typography } from '@mui/material'
import { MoveRow } from './MoveRow'
import type { Pokemon } from '../interfaces/PokemonRealtedInterfaces';

type CleanMove = {
    name: string;
    level: number;
    versionGroup: string;
}

interface PokemonMovesProps {
    pokemon: Pokemon
}

const TARGET_VERSION_GROUP = 'scarlet-violet'

export const PokemonMoves = ({ pokemon }: PokemonMovesProps) => {

    const levelUpMoves: CleanMove[] = [];

    for (const move of pokemon.moves) {
        const vg = move.version_group_details.find(d => d.version_group.name === TARGET_VERSION_GROUP && d.move_learn_method.name === 'level-up')
        if (!vg) continue;

        levelUpMoves.push({
            name: move.move.name,
            level: vg.level_learned_at,
            versionGroup: vg.version_group.name
        })
    }

    // sort by level, then name
    levelUpMoves.sort((a, b) => {
        if (a.level === b.level) return a.name.localeCompare(b.name);
        return a.level - b.level;
    })

    return (
        levelUpMoves.length > 0 && (
            <Box
                sx={{
                    p: 2,
                    borderRadius: 2,
                    bgcolor: "rgba(0, 0, 0, 0.02)",
                    mt: 1,

                }}
            >
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                    Level-up Moves (Scarlet/Violet)
                </Typography>

                {/* header row */}
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "60px 1.2fr 0.9fr 0.7fr 0.6fr 0.8fr",
                        columnGap: 1,
                        mb: 0.5,

                    }}
                >
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                        Lv
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                        Move
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                        Type
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                        Class
                    </Typography>
                    <Typography
                        variant="caption"
                        sx={{ fontWeight: 600, textAlign: "right" }}
                    >
                        Power
                    </Typography>
                    <Typography
                        variant="caption"
                        sx={{ fontWeight: 600, textAlign: "right" }}
                    >
                        Acc
                    </Typography>
                </Box>

                <Box
                    sx={{
                        maxHeight: 220,
                        overflowY: "auto",
                        pr: 1,
                    }}
                >
                    {levelUpMoves.map((m) => (
                        <MoveRow key={`${m.level}-${m.name}`} move={m} />
                    ))}
                </Box>
            </Box>
        )
    )
}
