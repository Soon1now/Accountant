import { Route, Routes } from 'react-router-dom';
import './App.css'
import Layout from './app/Layout';
import ClientPage from './pages/ClientsPage';
import ServicesPage from './pages/ServicesPage';
import DashboardPage from './pages/DashboardPage';
import SheadulePage from './pages/SchedulePage';
import BillingPlans from './pages/BillingPlansPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './ProtectedProvider';

export default function App() {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path='/' element={<Layout />} >
          <Route path='/clients' element={<ClientPage />}> </Route>
          <Route path='/services' element={<ServicesPage />}> </Route>
          <Route index element={<DashboardPage />} />
          <Route path='/schedule' element={<SheadulePage />}> </Route>
          <Route path='/plans' element={<BillingPlans />}> </Route>
        </Route>
      </Route>
    </Routes>
  );
}

