import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchForms = async () => {
    try {
      setLoading(true);
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const res = await fetch(`${apiUrl}/form-api/forms`);
      const data = await res.json();
      if (res.ok) {
        setForms(data.payLoad || []);
        setError("");
      } else {
        setError("Failed to fetch submissions");
      }
    } catch (err) {
      setError("Could not connect to server");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  return (
    <div className="dashboard-page">
      <h1 className="dashboard-title">Form Dashboard</h1>

      {loading ? (
        <p className="dashboard-status">Loading...</p>
      ) : error ? (
        <p className="dashboard-status dashboard-error">{error}</p>
      ) : forms.length === 0 ? (
        <div className="dashboard-empty">
          <p>No submissions yet.</p>
          <Link to="/" className="back-link mt-4">← Submit a Form</Link>
        </div>
      ) : (
        <div className="cards-grid">
          {forms.map((form) => (
            <div className="card" key={form._id}>
              <h3 className="card-name">{form.name}</h3>
              <p className="card-email">{form.email}</p>
              {form.message && (
                <p className="card-message">{form.message}</p>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="dashboard-nav mt-10 text-center">
        <Link to="/" className="text-gray-500 hover:text-gray-800 transition">← Back to Form</Link>
      </div>
    </div>
  );
}

export default Dashboard;
