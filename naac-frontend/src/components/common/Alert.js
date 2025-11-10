// src/components/common/Alert.js
import React from 'react';

const Alert = ({ type = 'info', message, onClose, icon }) => {
  const icons = {
    success: 'check-circle',
    danger: 'exclamation-triangle',
    warning: 'exclamation-circle',
    info: 'info-circle'
  };

  return (
    <div className={`alert alert-${type} alert-dismissible fade show`} role="alert">
      <i className={`bi bi-${icon || icons[type]} me-2`}></i>
      {message}
      {onClose && (
        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
      )}
    </div>
  );
};

export default Alert;
