import React, { useState } from "react";
import { useNavigate , Link } from "react-router-dom";
import useAuth from '../hooks/useAuth'; // Import the custom hook
import axios from '../api/axios';      // Import the public axios instance

const LOGIN_URL = '/auth/login';

export default function Login() {
  const { setAuth } = useAuth(); // Get setAuth from our context
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify(form),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        }
      );

      const accessToken = response?.data?.accessToken;
      const user = response?.data?.user;
      
      // Save the authentication state globally
      setAuth({ user, accessToken });
      
      setForm({ email: "", password: "" }); // Clear form on success
      navigate("/dashboard");
    } catch (err) {
      if (!err?.response) {
        setMessage('No Server Response');
      } else if (err.response?.status === 401) {
        setMessage('Invalid Credentials');
      } else {
        setMessage('Login Failed');
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}