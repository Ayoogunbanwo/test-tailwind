import { useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';

export const useSessionTimeout = (timeoutMinutes = 30) => {
  const navigate = useNavigate();
  const timeoutIdRef = useRef(null); // Use useRef to store the timeout ID

  const handleLogout = useCallback(async () => {
    try {
      await signOut(auth);
      navigate('/customer');
      alert('Your session has expired. Please sign in again.');
    } catch (error) {
      console.error('Logout error:', error);
      alert('An error occurred during logout. Please try again.');
    }
  }, [navigate]);

  const resetTimeout = useCallback(() => {
    if (timeoutIdRef.current) {
      window.clearTimeout(timeoutIdRef.current);
    }

    timeoutIdRef.current = window.setTimeout(() => {
      handleLogout();
    }, timeoutMinutes * 60 * 1000);
  }, [timeoutMinutes, handleLogout]);

  useEffect(() => {
    const events = ['mousedown', 'keydown', 'scroll', 'mousemove', 'touchstart'];

    const handleUserActivity = () => {
      resetTimeout();
    };

    events.forEach(event => {
      window.addEventListener(event, handleUserActivity);
    });

    // Initialize timeout
    resetTimeout();

    // Cleanup
    return () => {
      if (timeoutIdRef.current) {
        window.clearTimeout(timeoutIdRef.current);
      }
      events.forEach(event => {
        window.removeEventListener(event, handleUserActivity);
      });
    };
  }, [resetTimeout]);

  return { resetTimeout };
};