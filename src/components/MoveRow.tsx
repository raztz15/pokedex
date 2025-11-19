import React from 'react'
import { useGetMoveDetailsQuery } from '../apis/Pokemon.api';
import { Box, Chip, Typography } from '@mui/material';

type CleanMove = {
    name: string;
    level: number;
    versionGroup: string;
};

interface MoveRowProps {
    move: CleanMove;
}

export const MoveRow = ({ move }: MoveRowProps) => {
    const { data } = useGetMoveDetailsQuery(move.name)

    const typeName = data?.type.name ?? null;
    const power = data?.power ?? null;
    const accuracy = data?.accuracy ?? null;
    const damageClass = data?.damage_class.name ?? null;

    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: "60px 1.2fr 0.9fr 0.7fr 0.6fr 0.8fr",
                alignItems: 'center',
                py: .5,
                borderBottom: '1px solid rgba(0,0,0,0.04)',
                columnGap: 1,
            }}
        >
            {/* Level */}
            <Typography variant='body2' sx={{ fontWeight: 600 }}>
                Lv. {move.level}
            </Typography>

            {/* Name */}
            <Typography
                variant="body2"
                sx={{
                    textTransform: "capitalize",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                }}
            >
                {move.name.replace(/-/g, " ")}
            </Typography>

            {/* Type */}
            <Box>
                {typeName && (
                    <Chip
                        label={typeName}
                        size="small"
                        sx={{ textTransform: "capitalize" }}
                    />
                )}


            </Box>
            {/* Damage class */}
            <Typography variant="body2" sx={{ textTransform: "capitalize" }}>
                {damageClass ?? "—"}
            </Typography>
            {/* Power */}
            <Typography variant="body2" sx={{ textAlign: "right" }}>
                {power ?? "—"}
            </Typography>
            {/* Accuracy */}
            <Typography variant="body2" sx={{ textAlign: "right" }}>
                {accuracy ? `${accuracy}%` : "—"}
            </Typography>

        </Box>
    )
}
