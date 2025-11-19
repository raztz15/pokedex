import { Box, Typography } from '@mui/material'
import type { Pokemon, PokemonAbility, PokemonStat } from '../interfaces/PokemonRealtedInterfaces'
import { InfoChip } from './InfoChip';
import { MatchupRow } from './MatchupRow';
import { useGetTypedDetailsQuery } from '../apis/Pokemon.api';

interface PokemonBattleInfoProps {
    abilities: PokemonAbility[];
    stats: PokemonStat[];
    pokemon: Pokemon;
}

export const PokemonBattleInfo = ({ abilities, stats, pokemon }: PokemonBattleInfoProps) => {

    const totalStats = stats.reduce((sum, s) => sum + s.base_stat, 0);

    const firstType = pokemon.types[0]?.type.name
    const secondType = pokemon.types[1]?.type.name

    const firstQuery = useGetTypedDetailsQuery(firstType)
    const secondQuery = useGetTypedDetailsQuery(secondType ?? firstType)

    const typeData = [firstQuery.data, secondQuery.data].filter(Boolean)


    // ----- OFFENSIVE MATCHUPS -----
    const offensiveMatchups = {
        strongAgainst: new Set<string>(),   // double_damage_to
        weakAgainst: new Set<string>(),     // half_damage_to
        noEffectOn: new Set<string>(),      // no_damage_to
    };

    const defensiveMatchups = {
        weakTo: new Set<string>(),
        resist: new Set<string>(),
        immune: new Set<string>()
    }

    for (const td of typeData) {
        td?.damage_relations.double_damage_from.forEach(t => defensiveMatchups.weakTo.add(t.name))
        td?.damage_relations.half_damage_from.forEach(t => defensiveMatchups.resist.add(t.name))
        td?.damage_relations.no_damage_from.forEach(t => defensiveMatchups.immune.add(t.name))
    }

    for (const td of typeData) {
        td?.damage_relations.double_damage_to.forEach((t) =>
            offensiveMatchups.strongAgainst.add(t.name)
        );

        td?.damage_relations.half_damage_to.forEach((t) =>
            offensiveMatchups.weakAgainst.add(t.name)
        );

        td?.damage_relations.no_damage_to.forEach((t) =>
            offensiveMatchups.noEffectOn.add(t.name)
        );
    }

    const weaknesses = Array.from(defensiveMatchups.weakTo);

    const resistances = Array.from(defensiveMatchups.resist);
    const immunities = Array.from(defensiveMatchups.immune);

    const strongAgainst = Array.from(offensiveMatchups.strongAgainst);
    const weakAgainst = Array.from(offensiveMatchups.weakAgainst);
    const noEffectOn = Array.from(offensiveMatchups.noEffectOn);

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {/* Snapshot */}
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                <InfoChip label="Total base stats" value={totalStats} />
            </Box>

            {/* Stats + Abilities */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    gap: 3,
                }}
            >
                {/* Stats with bars */}
                <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                        Stats
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                        {stats.map((s) => {
                            const label = s.stat.name.replace("-", " ");
                            const value = s.base_stat;
                            const width = Math.min((value / 255) * 100, 100); // 255 ~ max

                            return (
                                <Box key={s.stat.name}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            mb: 0.3,
                                        }}
                                    >
                                        <Typography
                                            variant="caption"
                                            sx={{ textTransform: "capitalize" }}
                                        >
                                            {label}
                                        </Typography>
                                        <Typography variant="caption">{value}</Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            height: 8,
                                            borderRadius: 999,
                                            bgcolor: "grey.200",
                                            overflow: "hidden",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: `${width}%`,
                                                height: "100%",
                                                borderRadius: 999,
                                                bgcolor:
                                                    value >= 120
                                                        ? "success.main"
                                                        : value >= 80
                                                            ? "warning.main"
                                                            : "error.main",
                                            }}
                                        />
                                    </Box>
                                </Box>
                            );
                        })}
                    </Box>
                </Box>

                {/* Abilities */}
                <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                        Abilities
                    </Typography>

                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                        {abilities.map((a) => (
                            <Box
                                key={a.ability.name}
                                sx={{
                                    p: 1,
                                    borderRadius: 2,
                                    bgcolor: "grey.100",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    sx={{ textTransform: "capitalize" }}
                                >
                                    {a.ability.name.replace("-", " ")}
                                </Typography>
                                {a.is_hidden && (
                                    <Typography variant="caption" color="text.secondary">
                                        Hidden ability
                                    </Typography>
                                )}
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
            {/* Matchups grid */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                    gap: 2,
                }}
            >
                {/* Defensive */}
                <Box
                    sx={{
                        p: 2,
                        borderRadius: 2,
                        bgcolor: "rgba(33, 150, 243, 0.04)",
                    }}
                >
                    <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                        Defensive Matchups
                    </Typography>

                    {weaknesses.length > 0 && (
                        <MatchupRow label="Weak to" chips={weaknesses} tone="weak" />
                    )}
                    {defensiveMatchups.resist.size > 0 && (
                        <MatchupRow
                            label="Resists"
                            chips={resistances}
                            tone="resist"
                        />
                    )}
                    {defensiveMatchups.immune.size > 0 && (
                        <MatchupRow
                            label="Immune to"
                            chips={immunities}
                            tone="immune"
                        />
                    )}
                </Box>

                {/* Offensive */}
                <Box
                    sx={{
                        p: 2,
                        borderRadius: 2,
                        bgcolor: "rgba(255, 152, 0, 0.04)",
                    }}
                >
                    <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                        Offensive Matchups
                    </Typography>

                    {offensiveMatchups.strongAgainst.size > 0 && (
                        <MatchupRow
                            label="Strong against"
                            chips={strongAgainst}
                            tone="strong"
                        />
                    )}
                    {offensiveMatchups.weakAgainst.size > 0 && (
                        <MatchupRow
                            label="Not very effective vs"
                            chips={weakAgainst}
                            tone="neutral"
                        />
                    )}
                    {offensiveMatchups.noEffectOn.size > 0 && (
                        <MatchupRow
                            label="No effect vs"
                            chips={noEffectOn}
                            tone="immune"
                        />
                    )}
                </Box>
            </Box>
        </Box>
    );
}
