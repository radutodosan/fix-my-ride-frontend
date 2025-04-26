import "bootstrap/dist/css/bootstrap.min.css";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import ClientAppointmentsPage from "./pages/ClientAppointmentsPage";
import ClientProfilePage from "./pages/ClientProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import ClientMechanicsPage from "./pages/ClientMechanicsPage";


const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <NotFoundPage />
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
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
