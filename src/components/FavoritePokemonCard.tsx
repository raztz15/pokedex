import { useNavigate } from 'react-router-dom';
import { useGetOnePokemonQuery } from '../apis/Pokemon.api';
import { Box, CircularProgress } from '@mui/material';
import { PokemonCard } from './PokemonCard';
import { getPokemonRegion } from '../utils';

interface FavoritePokemonCardProps {
    id: number;
}

export const FavoritePokemonCard = ({ id }: FavoritePokemonCardProps) => {
    const navigate = useNavigate();
    const { data, error, isLoading } = useGetOnePokemonQuery(id)

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
        return null;
    }

    return (
        <PokemonCard id={data.id.toString()} name={data.name} onClick={() => navigate(`/pokemon/${data.id}`)} region={getPokemonRegion(id)} />
    )
}
