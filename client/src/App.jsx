import { useState } from "react";
import SearchPage from "./components/pages/SearchPage";
import ProfilePage from './components/pages/ProfilePage';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const routes = [
    {
      path: "/SearchPage",
      element: <SearchPage />,
    },
    {
      path: "/profile",
      element: <ProfilePage />,
    },
  ];
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}

export default App;
