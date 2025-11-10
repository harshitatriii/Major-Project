// src/components/common/StatCard.js
import React from 'react';

const StatCard = ({ title, value, icon, color = 'primary', link, trend }) => {
  return (
    <div className={`card border-${color} shadow-sm h-100`}>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h6 className="text-muted mb-2">{title}</h6>
            <h2 className="fw-bold mb-0">{value}</h2>
            {trend && (
              <small className={`text-${trend > 0 ? 'success' : 'danger'}`}>
                <i className={`bi bi-arrow-${trend > 0 ? 'up' : 'down'} me-1`}></i>
                {Math.abs(trend)}%
              </small>
            )}
          </div>
          <div className={`bg-${color} bg-opacity-10 p-3 rounded`}>
            <i className={`bi bi-${icon} fs-1 text-${color}`}></i>
          </div>
        </div>
      </div>
      {link && (
        <div className="card-footer bg-transparent border-0">
          <a href={link} className="text-decoration-none small">
            View Details <i className="bi bi-arrow-right ms-1"></i>
          </a>
        </div>
      )}
    </div>
  );
};

export default StatCard;