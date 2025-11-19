import { Box, Typography } from '@mui/material';

interface InfoChipProps {
    label: string;
    value: string | number;
}

export const InfoChip = ({ label, value }: InfoChipProps) => (
    <Box
        sx={{
            px: 1.5,
            py: 0.5,
            borderRadius: 2,
            bgcolor: "grey.100",
            display: "inline-flex",
            flexDirection: "column",
            minWidth: 90,
        }}
    >
        <Typography variant="caption" color="text.secondary">
            {label}
        </Typography>
        <Typography variant="body2" fontWeight={600}>
            {value}
        </Typography>
    </Box>
);

