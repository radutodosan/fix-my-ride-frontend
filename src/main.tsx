import "bootstrap/dist/css/bootstrap.min.css";
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


const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
        errorElement: <NotFoundPage />
      },
      {
          path: 'login',
          element: <LoginPage />
      },
      {
        path: 'client/appointments',
        element: <ClientAppointmentsPage />
      },
      {
        path: 'client/profile/:username',
        element: <ClientProfilePage />
      },
      {
        path: 'client/mechanics',
        element: <ClientMechanicsPage />
      },
      {
        path: 'mechanic/appointments',
        element: <MechanicAppointmentsPage />
      },
      {
        path: 'mechanic/profile/:username',
        element: <MechanicProfilePage />
      },
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
