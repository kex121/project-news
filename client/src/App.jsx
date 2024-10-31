import { useState } from "react";
import Root from './components/ui/Root';
import SearchPage from "./components/pages/SearchPage";
import ProfilePage from './components/pages/ProfilePage';
import SignInPage from './components/pages/SignInPage';
import SignUpPage from './components/pages/SignUpPage';
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
        {
          path: "/signin",
          element: <SignInPage />,
        },
        {
          path: "/signup",
          element: <SignUpPage />,
        },
      ]
    }
  ];
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}

export default App;
