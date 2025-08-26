import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TravelLogList from "./TravelLogList";
import TravelLogForm from "./TravelLogForm";

export default function Dashboard({ onLogout }) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [logToEdit, setLogToEdit] = useState(null);
  
  // ADDED: State to store the authentication token
  const [token, setToken] = useState(null);

  const refreshLogs = () => setRefreshKey((prev) => prev + 1);

  const handleSuccess = () => {
    setLogToEdit(null); 
    refreshLogs();
  };

  const handleCancel = () => {
    setLogToEdit(null);
  };

  const handleEdit = (log) => {
    setLogToEdit(log);
  };
  
  useEffect(() => {
    const fetchProtectedData = async () => {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken); // ADDED: Set the token in state
      
      if (!storedToken) {
        setMessage("No token found, please log in.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/test/protected", {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.message || "Failed to fetch");
        }

        const data = await res.json();
        setMessage(data.message || "Welcome to your dashboard!");
      } catch (err) {
        setMessage("Error fetching data: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProtectedData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container">
      <div className="header">
        <h2>Dashboard</h2>
        <div className="d-flex align-items-center">
          <Link to="/public-logs" className="btn btn-primary me-2 link-button">
            Public Logs
          </Link>
          <Link to="/profile" className="btn btn-info me-2 link-button">
            Profile
          </Link>
          <button onClick={onLogout} className="btn btn-danger link-button">
            Logout
          </button>
        </div>
      </div>
      <p>{message}</p>
      
      {/* ADDED: Pass the token to child components */}
      <TravelLogForm
        logToEdit={logToEdit}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
        token={token} 
      />
      <TravelLogList 
        refreshKey={refreshKey} 
        onEdit={handleEdit} 
        token={token} 
      />
    </div>
  );
}