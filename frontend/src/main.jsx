import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Navbar from './components/layout/Navbar.jsx';
import './scss/main.scss'
import { AppProvider } from './context/context.jsx';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

const queryClient = new QueryClient ()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <AppProvider>
    <Navbar/>
    <App/>
    </AppProvider>
  </QueryClientProvider>
  </React.StrictMode>,
)
