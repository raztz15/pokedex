export type RegionId = | "kanto"
    | "johto"
    | "hoenn"
    | "sinnoh"
    | "unova"
    | "kalos"
    | "alola"
    | "galar"
    | "paldea"
    | "special";

export type RegionConfig = {
    id: RegionId;
    label: string;
    generation: string;
    startId: number;
    endId: number;
    color: string;
    emoji: string;
    tagline: string;
}

export const REGIONS: RegionConfig[] = [
    {
        id: 'kanto',
        label: 'Kanto',
        generation: 'generation-i',
        startId: 1,
        endId: 151,
        color: "#ffebee",
        emoji: "⭐",
        tagline: "The original 151.",
    },
    {
        id: "johto",
        label: "Johto",
        generation: "generation-ii",
        startId: 152,
        endId: 251,
        color: "#e3f2fd",
        emoji: "🌿",
        tagline: "New legends, old friends.",
    },
    {
        id: "hoenn",
        label: "Hoenn",
        generation: "generation-iii",
        startId: 252,
        endId: 386,
        color: "#e8f5e9",
        emoji: "🌋",
        tagline: "Islands and oceans."
    },
    {
        id: "sinnoh",
        label: "Sinnoh",
        generation: "generation-iv",
        startId: 387,
        endId: 493,
        color: "#fff3e0",
        emoji: "❄️",
        tagline: "Myth and mountains."
    },
    {
        id: "unova",
        label: "Unova",
        generation: "generation-v",
        startId: 494,
        endId: 649,
        color: "#f3e5f5",
        emoji: "🏙️",
        tagline: "Big city energy."
    },
    {
        id: "kalos",
        label: "Kalos",
        generation: "generation-vi",
        startId: 650,
        endId: 721,
        color: "#e0f2f1",
        emoji: "🎀",
        tagline: "Fashion and fairy types."
    },
    {
        id: "alola",
        label: "Alola",
        generation: "generation-vii",
        startId: 722,
        endId: 809,
        color: "#ede7f6",
        emoji: "🌴",
        tagline: "A tropical region."
    },
    {
        id: "galar",
        label: "Galar",
        generation: "generation-viii",
        startId: 810,
        endId: 898,
        color: "#f1f8e9",
        emoji: "⚔️",
        tagline: "Champions and stadiums."
    },
    {
        id: "paldea",
        label: "Paldea",
        generation: "generation-ix",
        startId: 899,
        endId: 1010, // can tweak as you like
        color: "#fff8e1",
        emoji: "📚",
        tagline: "Academies and open world."
    },
    {
        id: 'special',
        label: 'Special Forms',
        generation: 'special-forms',
        startId: 10001,
        endId: 20000,
        color: '#fce4ec',
        emoji: "✨",
        tagline: 'Alternate forms & event Pokémon.'
    }
]