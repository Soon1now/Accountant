import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './entities/authContext.tsx'
import { ClientProvider } from './entities/clientContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ClientProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ClientProvider>
    </AuthProvider>
  </StrictMode>,
)
