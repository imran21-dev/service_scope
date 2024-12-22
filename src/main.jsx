import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MainLayout from './layout/MainLayout.jsx';


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from './pages/HomePage.jsx';
import Register from './pages/Register.jsx';
import ContextApi from './provider/ContextApi.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: '/',
        element: <HomePage></HomePage>
      },
      {
        path: '/register',
        element: <Register></Register>
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <ContextApi>
     <RouterProvider router={router} />
     </ContextApi>
  </StrictMode>,
)
