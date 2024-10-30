import { useState } from "react";
import SearchPage from "./components/pages/SearchPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const routes = [
    {
      path: "/SearchPage",
      element: <SearchPage />,
    },
  ];
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}

export default App;
