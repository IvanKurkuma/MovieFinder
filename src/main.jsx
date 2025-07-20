import { BrowserRouter } from "react-router-dom";
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {ThemeProvider} from './contexts/ThemeContext.jsx'
import {FavoriteProvider} from './contexts/useFavorite.jsx'
import { SearchProvider } from "./contexts/useSearch.jsx";

createRoot(document.getElementById('root')).render(
    <ThemeProvider>
        <SearchProvider>
            <FavoriteProvider>
                <App />
            </FavoriteProvider>
        </SearchProvider>
    </ThemeProvider>

)
