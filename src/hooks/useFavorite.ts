import { useCallback, useEffect, useState } from "react";

const FAVORITE_KEY = 'favoritePokemonIds'

export const useFavorite = () => {
    const [favoriteIds, setFavoriteIds] = useState<number[]>(() => {
        try {
            const saved = localStorage.getItem(FAVORITE_KEY)
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem(FAVORITE_KEY, JSON.stringify(favoriteIds))
    }, [favoriteIds])

    const toggleFavorite = useCallback((id: number) => {
        setFavoriteIds(prev => {
            const exists = prev.includes(id);
            return exists ?
                prev.filter(faveId => faveId !== id) :
                [...prev, id]
        })
    }, [])

    const isFavorite = useCallback((id: number) => {
        return favoriteIds.includes(id)
    }, [favoriteIds])

    return { favoriteIds, isFavorite, toggleFavorite }

}