// src/components/common/EmptyState.js
import React from 'react';

const EmptyState = ({ icon, title, message, actionText, onAction }) => {
  return (
    <div className="text-center py-5">
      <i className={`bi bi-${icon} fs-1 text-muted mb-3 d-block`}></i>
      <h5 className="text-muted mb-2">{title}</h5>
      <p className="text-muted mb-3">{message}</p>
      {actionText && onAction && (
        <button className="btn btn-primary" onClick={onAction}>
          <i className="bi bi-plus-circle me-2"></i>
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;