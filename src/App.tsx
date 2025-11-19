import { CssBaseline, ThemeProvider, createTheme, } from "@mui/material";
import { RegionDashboard } from "./components/RegionDashboard";
import { Route, Routes } from "react-router-dom";
import { SearchPage } from "./components/SearchPage";
import { PokemonPage } from "./components/PokemonPage";
import { FavoritePokemons } from "./components/FavoritePokemons";

function App() {

  const theme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#e53935', // poke-red vibe
      },
      secondary: {
        main: '#fdd835', // pikachu yellow
      }
    },
    shape: {
      borderRadius: 8,
    }
  })


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<RegionDashboard />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/pokemon/:idOrName" element={<PokemonPage />} />
        <Route path="/favorites" element={<FavoritePokemons />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
