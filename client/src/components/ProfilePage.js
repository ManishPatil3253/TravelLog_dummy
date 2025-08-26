// client/src/components/ProfilePage.js
import React, { useState, useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate'; // Import the hook
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchProfile = async () => {
      try {
        const response = await axiosPrivate.get('/users/profile', {
          signal: controller.signal
        });
        if (isMounted) {
          setUser(response.data);
        }
      } catch (err) {
        if (err.name !== 'CanceledError') {
          console.error(err);
          // If the refresh token is also invalid, the interceptor will fail.
          // We navigate the user back to the login page.
          setMessage('Your session has expired. Please log in again.');
          navigate('/login');
        }
      }
    };

    fetchProfile();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate, navigate]);

  if (message) {
    return (
      <div className="container mt-5 text-center">
        <p className="text-danger">{message}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mt-5 text-center">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="auth-form-container">
      <h2>User Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
}