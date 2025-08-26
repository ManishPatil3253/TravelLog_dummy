// client/src/components/TravelLogList.js
import React, { useEffect, useState } from "react";
import TravelLogCard from "./TravelLogCard";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export default function TravelLogList({ refreshKey, onEdit }) {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchLogs = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axiosPrivate.get("/travel-logs", {
          signal: controller.signal
        });
        if (isMounted) {
          setLogs(response.data);
        }
      } catch (err) {
        if (err.name !== 'CanceledError') {
          setError(err.message || "Failed to fetch logs");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchLogs();

    return () => {
      isMounted = false;
      controller.abort();
    }
  }, [refreshKey, axiosPrivate]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this travel log?")) return;
    try {
      await axiosPrivate.delete(`/travel-logs/${id}`);
      // Refresh the list by filtering out the deleted log
      setLogs(prevLogs => prevLogs.filter(log => log._id !== id));
    } catch (err) {
      console.error("Failed to delete log:", err);
    }
  };
  
  const handleTogglePrivacy = async (logId, isPublic) => {
    try {
      const response = await axiosPrivate.put(`/travel-logs/${logId}`, {
        isPublic: !isPublic 
      });
      // Update the specific log in the state to reflect the change
      setLogs(prevLogs => 
        prevLogs.map(log => 
          log._id === logId ? response.data : log
        )
      );
    } catch (err) {
      console.error('Failed to toggle privacy:', err);
    }
  };

  if (loading) return <p>Loading travel logs...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2 className="mb-4">Your Travel Logs</h2>
      {logs.length === 0 ? (
        <p>No travel logs found. Create one above!</p>
      ) : (
        <div className="logs-grid">
          {logs.map((log) => (
            <TravelLogCard
              key={log._id}
              log={log}
              onEdit={onEdit}
              onDelete={handleDelete}
              onTogglePrivacy={handleTogglePrivacy}
              showControls={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}