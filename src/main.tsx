
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import ClientAppointmentsPage from "./pages/ClientAppointmentsPage";
import ClientProfilePage from "./pages/ClientProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import ClientMechanicsPage from "./pages/ClientMechanicsPage";
import MechanicAppointmentsPage from "./pages/MechanicAppointmentsPage";
import MechanicProfilePage from "./pages/MechanicProfilePage";
import LoginPage from "./pages/LoginPage";
import MainLayout from "./layouts/MainLayout";
import { AlertProvider } from "./contexts/AlertContext";

import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';
import ProtectedRoute from './components/ProtectedRoute';


const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        path: 'client/appointments',
        element:
          <ProtectedRoute allowedUserType="client">
            <ClientAppointmentsPage />
          </ProtectedRoute>
      },
      {
        path: 'client/profile/:username',
        element:
          <ProtectedRoute allowedUserType="client">
            <ClientProfilePage />
          </ProtectedRoute>
      },
      {
        path: 'client/mechanics',
        element:
          <ProtectedRoute allowedUserType="client">
            <ClientMechanicsPage />
          </ProtectedRoute>
      },
      {
        path: 'mechanic/appointments',
        element:
          <ProtectedRoute allowedUserType="mechanic">
            <MechanicAppointmentsPage />
          </ProtectedRoute>
      },
      {
        path: 'mechanic/profile/:username',
        element:
          <ProtectedRoute allowedUserType="mechanic">
            <MechanicProfilePage />
          </ProtectedRoute>
      },
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AlertProvider>
      <RouterProvider router={router} />
    </AlertProvider>
  </StrictMode>,
)
