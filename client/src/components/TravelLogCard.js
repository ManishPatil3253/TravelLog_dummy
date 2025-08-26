// TRAVEL_LOG/client/src/components/TravelLogCard.js

import React from 'react';

const getRandomImage = () => {
  const images = [
    'https://images.unsplash.com/photo-1549414963-39d91f271a74?q=80&w=2940&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1579227114347-ee21360183b0?q=80&w=2832&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1628173499066-6b2158917822?q=80&w=2824&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1536848240546-24855848e35f?q=80&w=2938&auto=format&fit=crop',
  ];
  return images[Math.floor(Math.random() * images.length)];
};

const getRandomRotation = () => (Math.random() - 0.5) * 4;

export default function TravelLogCard({ log, onEdit, onDelete, onTogglePrivacy, showControls = true }) {
  const [rotation] = React.useState(getRandomRotation());
  const imageUrl = getRandomImage();

  return (
    <div className="log-card" style={{ '--rotation': `${rotation}deg` }}>
      <img src={imageUrl} alt={log.title} className="log-image" />
      <h3 className="log-title">{log.title}</h3>
      <p className="log-description">{log.description}</p>
      <small className="text-muted">{log.location}</small>
      
      {showControls && (
        <div className="mt-3">
          <button className="btn btn-sm btn-outline-secondary me-2 link-button" onClick={() => onEdit(log)}>Edit</button>
          <button className="btn btn-sm btn-outline-danger me-2 link-button" onClick={() => onDelete(log._id)}>Delete</button>
          <div className="form-check form-switch d-inline-block">
            <input
              className="form-check-input"
              type="checkbox"
              id={`flexSwitchCheckDefault-${log._id}`}
              checked={log.isPublic}
              onChange={() => onTogglePrivacy(log._id, log.isPublic)}
            />
            <label className="form-check-label" htmlFor={`flexSwitchCheckDefault-${log._id}`}>
              {log.isPublic ? 'Public' : 'Private'}
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
