// src/components/common/StatusBadge.js
import React from 'react';

const StatusBadge = ({ status }) => {
  const badgeColors = {
    ACTIVE: 'success',
    INACTIVE: 'secondary',
    PENDING: 'warning',
    COMPLETED: 'info',
    CANCELLED: 'danger'
  };

  return (
    <span className={`badge bg-${badgeColors[status] || 'secondary'}`}>
      {status}
    </span>
  );
};

export default StatusBadge;