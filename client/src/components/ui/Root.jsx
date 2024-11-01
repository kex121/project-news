import NavBar from './NavBar';
import { Outlet } from 'react-router-dom';

export default function Root({ user, handleSignOut }) {
  return (
    <>
      <NavBar user={user} handleSignOut={handleSignOut}/>
      <Outlet />
    </>
  );
}
