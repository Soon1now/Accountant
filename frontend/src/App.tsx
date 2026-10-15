import { Route, Routes } from 'react-router-dom';
import './App.css'
import Layout from './app/Layout';
import ClientPage from './pages/ClientsPage';
import ServicesPage from './pages/ServicesPage';
import DashboardPage from './pages/DashboardPage';
import SheadulePage from './pages/ShedulePage';

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />} >
        <Route path='/clients' element={<ClientPage />}> </Route>
        <Route path='/services' element={<ServicesPage />}> </Route>
        <Route path='/dashboard' element={<DashboardPage />}> </Route>
        <Route path='/schedule' element={<SheadulePage />}> </Route>
      </Route>
    </Routes>

  );
}

