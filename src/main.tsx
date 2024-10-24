import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import { CssBaseline } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { store } from './redux/store/Store.ts';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { ThemeProvider } from '@mui/material/styles';
import { Provider as ProviderRedux } from 'react-redux'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { darkTheme } from './theme.tsx';
import { router } from './routes/routes.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
    <ProviderRedux store={store}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <RouterProvider router={router} />
            </ThemeProvider>
        </LocalizationProvider>
    </ProviderRedux>
</React.StrictMode>,
)
