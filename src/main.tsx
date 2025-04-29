
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';


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
import ProtectedRoute from './components/ProtectedRoute';
import SignUpPage from './pages/SignUpPage';
import CreateAppointmentPage from "./pages/CreateAppointmentPage";
import { UserType } from "./types/userType";


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
        path: 'signup',
        element: <SignUpPage />
      },
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        path: 'client/appointments',
        element:
          <ProtectedRoute allowedUserType={UserType.CLIENT}>
            <ClientAppointmentsPage />
          </ProtectedRoute>
      },
      {
        path: 'client/appointments/create',
        element:
          <ProtectedRoute allowedUserType={UserType.CLIENT}>
            <CreateAppointmentPage />
          </ProtectedRoute>
      },
      {
        path: 'client/profile/:username',
        element:
          <ProtectedRoute allowedUserType={UserType.CLIENT}>
            <ClientProfilePage />
          </ProtectedRoute>
      },
      {
        path: 'client/mechanics',
        element:
          <ProtectedRoute allowedUserType={UserType.CLIENT}>
            <ClientMechanicsPage />
          </ProtectedRoute>
      },
      {
        path: 'mechanic/appointments',
        element:
          <ProtectedRoute allowedUserType={UserType.MECHANIC}>
            <MechanicAppointmentsPage />
          </ProtectedRoute>
      },
      {
        path: 'mechanic/profile/:username',
        element:
          <ProtectedRoute allowedUserType={UserType.MECHANIC}>
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
