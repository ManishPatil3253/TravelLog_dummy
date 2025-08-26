import React, { useState, useEffect } from 'react';
import TravelLogCard from './TravelLogCard';

export default function PublicLogsPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPublicLogs = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('http://localhost:5000/api/travel-logs/public');
        if (!res.ok) {
          throw new Error('Failed to fetch public logs');
        }
        const data = await res.json();
        setLogs(data);
      } catch (err) {
        setError('Error fetching public logs: ' + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPublicLogs();
  }, []);

  if (loading) return <p>Loading public travel logs...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container">
      <div className="header">
        <h2>Public Travel Logs</h2>
      </div>
      {logs.length === 0 ? (
        <p>No public travel logs available yet.</p>
      ) : (
        <div className="logs-grid">
          {logs.map((log) => (
            <TravelLogCard key={log._id} log={log} showControls={false} />
          ))}
        </div>
      )}
    </div>
  );
}
