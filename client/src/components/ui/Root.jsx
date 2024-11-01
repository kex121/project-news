import NavBar from './NavBar';
import { Outlet } from 'react-router-dom';

export default function Root({ user }) {
  return (
    <>
      <NavBar user={user}/>
      <Outlet />
    </>
  );
}
