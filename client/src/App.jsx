import { useState } from "react";
import Root from './components/ui/Root';
import SearchPage from "./components/pages/SearchPage";
import ProfilePage from './components/pages/ProfilePage';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { patch } from "@mui/material";

function App() {
  const routes = [
    {
      path: '/',
      element: <Root/>,
      children: [
        {
          path: "/",
          element: <SearchPage />,
        },
        {
          path: "/profile",
          element: <ProfilePage />,
        },
      ]
    }
  ];
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}

export default App;
