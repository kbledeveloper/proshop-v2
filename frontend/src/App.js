import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { logout } from './slices/authSlice';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const dispatch = useDispatch();

  // useEffect hook to check if the user's login session has expired
  useEffect(() => {
    // Get the expiration time from localStorage
    const expirationTime = localStorage.getItem('expirationTime');

    if (expirationTime) {
      const currentTime = new Date().getTime();

      // If the current time exceeds the expiration time, the user's session has expired, and we dispatch the logout action.
      if (currentTime > expirationTime) {
        dispatch(logout());
      }
    }
  }, [dispatch]);

  return (
    <>
      {/* ToastContainer from react-toastify to display notifications */}
      <ToastContainer />

      {/* Header component */}
      <Header />

      {/* Main content wrapped inside a container */}
      <main className='py-3'>
        <Container>
          <Outlet /> {/* Outlet from react-router-dom, it renders the matched child route */}
        </Container>
      </main>

      {/* Footer component */}
      <Footer />
    </>
  );
};

export default App;

/*
The App component is the main entry point of the application.
It imports necessary modules and components, including react-toastify for displaying notifications.
The App component uses the useEffect hook to check if the user's login session has expired by comparing the current time with the stored expiration time in localStorage.
If the session has expired, the logout action is dispatched using the dispatch function.
The App component renders the Header, the main content wrapped inside a Container, and the Footer.
The Outlet component from react-router-dom is used to render the matched child route inside the Container.
*/