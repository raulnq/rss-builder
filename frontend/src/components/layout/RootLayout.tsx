import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout() {
  return (
    <>
      <Outlet />
      <ToastContainer position="top-right" />
    </>
  );
}
