import { useState } from "react";
import Root from './components/ui/Root';
import SearchPage from "./components/pages/SearchPage";
import ProfilePage from './components/pages/ProfilePage';
import SignInPage from './components/pages/SignInPage';
import SignUpPage from './components/pages/SignUpPage';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { patch } from "@mui/material";
import axiosInstance, { setAccessToken } from "./services/axiosInstance";

function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    axiosInstance('/tokens/refresh')
    .then((res) => {
      setUser(res.data.user);
      setAccessToken(res.data.accessToken);
    })
    .catch(() => {
      setUser(null);
      setAccessToken('');
  })
  }, []);

  const handleSignUp = async (e) => {
    e.preventDefault();
    const formData = new FormData (e.target);
    const data = Object.fromEntries(formData);
    const res = await axiosInstance.post('auth/signup', data);
    if(res.status === 200) {
      setUser(res.data.user);
      setAccessToken(res.data.accessToken);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const formData = new FormData (e.target);
    const data = Object.fromEntries(formData);
    const res = await axiosInstance.post('auth/signin', data);
    if(res.status === 200) {
      setUser(res.data.user);
      setAccessToken(res.data.accessToken);
    }
  };

  const handleSignOut = async () => {
    const res = await axiosInstance.post('auth/signout');
    if(res.status === 200) {
      setUser(null);
      setAccessToken('');
    }
  };

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
          element: <SignInPage handleSignIn={handleSignIn}/>,
        },
        {
          path: "/signup",
          element: <SignUpPage handleSignUp={handleSignUp} />,
        },
      ]
    }
  ];
  const router = createBrowserRouter(routes);
  return <><RouterProvider router={router} />;
  {console.log(user)}
  </>
}

export default App;
