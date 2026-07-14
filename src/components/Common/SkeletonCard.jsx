import React from 'react';

function SkeletonCard() {
  return (
    <div className="course-card skeleton">
      <div className="skeleton-image"></div>
      <div className="course-info">
        <div className="skeleton-text skeleton-category"></div>
        <div className="skeleton-text skeleton-title"></div>
        <div className="skeleton-text skeleton-meta"></div>
        <div className="skeleton-text skeleton-meta"></div>
        <div className="skeleton-text skeleton-price"></div>
      </div>
    </div>
  );
}

export default SkeletonCard;