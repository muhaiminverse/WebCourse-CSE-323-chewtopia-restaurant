import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  // createBrowserRouter, --> Didn't use it here since it's being used from 'Router.jsx'
  RouterProvider,
} from "react-router-dom";
import { router } from './Routes/Router.jsx'; // this is for organized routing
import { HelmetProvider } from 'react-helmet-async'; // Titel of the web tab 
import AuthProvider from './providers/AuthProvider.jsx'; // Auth provider
// TanStackProvider
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <div className='max-w-screen-xl mx-auto'>
            <RouterProvider router={router} />
          </div>
        </HelmetProvider>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
)
