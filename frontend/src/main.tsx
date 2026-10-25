import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './entities/authContext.tsx'
import { ClientProvider } from './entities/clientContext.tsx'
import { ServiceProvider } from './entities/serviceContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ClientProvider>
        <ServiceProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ServiceProvider>
      </ClientProvider>
    </AuthProvider>
  </StrictMode>,
)
