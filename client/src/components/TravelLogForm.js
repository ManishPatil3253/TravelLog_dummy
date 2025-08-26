// client/src/components/TravelLogForm.js
import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export default function TravelLogForm({ logToEdit = null, onSuccess, onCancel }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    isPublic: false
  });
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    if (logToEdit) {
      setForm({
        title: logToEdit.title || "",
        description: logToEdit.description || "",
        location: logToEdit.location || "",
        isPublic: logToEdit.isPublic,
      });
    } else {
      setForm({ title: "", description: "", location: "", isPublic: false });
    }
  }, [logToEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = logToEdit
      ? `/travel-logs/${logToEdit._id}`
      // Note: The base URL is already in our axios instance
      : "/travel-logs";
    const method = logToEdit ? "put" : "post";

    try {
      // The authorization header is automatically added by the interceptor
      await axiosPrivate[method](url, JSON.stringify(form));
      onSuccess();
    } catch (err) {
      console.error("Failed to save travel log:", err);
    }
  };

  return (
    <div className="card my-4 auth-form-container">
      <div className="card-body">
        <h3 className="card-title text-center mb-4">{logToEdit ? 'Edit Log' : 'Create New Log'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-field-group">
            <input
              name="title"
              type="text"
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-field-group">
            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
            />
          </div>
          <div className="form-field-group">
            <input
              name="location"
              type="text"
              placeholder="Location"
              value={form.location}
              onChange={handleChange}
            />
          </div>
          <div className="form-check form-field-group">
            <input
              className="form-check-input"
              type="checkbox"
              name="isPublic"
              id="isPublic"
              checked={form.isPublic}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="isPublic">
              Make Public
            </label>
          </div>
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">{logToEdit ? 'Update' : 'Add'}</button>
            {logToEdit && (
              <button type="button" className="btn btn-secondary" onClick={onCancel}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}