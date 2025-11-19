import { Box, Chip, Typography } from "@mui/material";

interface MatchupRowProps {
    label: string;
    chips: string[];
    tone: "weak" | "resist" | "immune" | "strong" | "neutral";
}

export const MatchupRow = ({ chips, label, tone }: MatchupRowProps) => {

    const bg =
        tone === "weak"
            ? "#ffebee"
            : tone === "resist"
                ? "#e8f5e9"
                : tone === "immune"
                    ? "#ede7f6"
                    : tone === "strong"
                        ? "#fff8e1"
                        : "#f5f5f5";

    return (
        <Box sx={{ mb: 1.5 }}>
            <Typography variant="caption" sx={{ fontWeight: 600 }}>
                {label}
            </Typography>
            <Box sx={{ mt: 0.5, display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {chips.map((t) => (
                    <Chip
                        key={t}
                        label={t}
                        size="small"
                        sx={{
                            textTransform: "capitalize",
                            bgcolor: bg,
                        }}
                    />
                ))}
            </Box>
        </Box>
    )
}
