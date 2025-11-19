import { Box, Typography } from "@mui/material";

interface InfoItemProps {
    label: string;
    value: string;
}

export const InfoItem = ({ label, value }: InfoItemProps) => {

    return (
        <Box>
            <Typography variant="caption" color="text.secondary">
                {label}
            </Typography>
            <Typography variant="body1" fontWeight={600}>
                {value}
            </Typography>
        </Box>
    )
}
