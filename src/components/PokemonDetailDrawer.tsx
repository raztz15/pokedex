import { useGetOnePokemonQuery, useGetPokemonSpeciesQuery } from '../apis/Pokemon.api';
import { Box, CircularProgress, Divider, Drawer, IconButton, Typography } from '@mui/material';
import { PokemonProfile } from './PokemonProfile';
// TODO ---> Check why they won't render
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import CloseIcon from "@mui/icons-material/Close";


interface PokemonDetailDrawerProps {
    selectedId: string;
    onClose: () => void;
}

export const PokemonDetailDrawer = ({ onClose, selectedId }: PokemonDetailDrawerProps) => {
    const open = Boolean(selectedId)

    const { data, isLoading, error } = useGetOnePokemonQuery(selectedId)
    const { data: species } = useGetPokemonSpeciesQuery(selectedId)

    // If nothing selected, don't render content at all
    if (!selectedId) {
        return (
            <Drawer anchor="right" open={false} onClose={onClose}>
                {/* nothing */}
            </Drawer>
        );
    }

    const renderBody = () => {
        if (isLoading) {
            return (
                <Box
                    sx={{
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                    <CircularProgress />
                </Box>
            )
        }

        if (error || !data) {
            return (
                <Box sx={{ p: 3 }}>
                    <Typography color="error">Failed to load Pokémon details.</Typography>
                </Box>
            );
        }

        return <PokemonProfile pokemon={data} species={species} />;
    }


    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    width: { xs: "100%", sm: 420, md: 480 },
                    borderRadius: { xs: 0, sm: "16px 0 0 16px" },
                    overflow: "hidden",
                },
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center", p: 2, pb: 1 }}>
                <CatchingPokemonIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Pokémon Profile
                </Typography>
                <IconButton onClick={onClose} edge="end">
                    <CloseIcon />
                </IconButton>
            </Box>
            <Divider />
            {renderBody()}
        </Drawer>
    )
}
