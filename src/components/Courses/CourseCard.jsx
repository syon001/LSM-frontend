import React from 'react';
import { useNavigate } from 'react-router-dom';

function CourseCard({ course, showProgress }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/course/${course.id}`);
  };

  return (
    <div className="course-card" onClick={handleClick}>
      <img src={course.image} alt={course.title} className="course-image" />
      
      <div className="course-info">
        <span className="course-category">{course.category}</span>
        <h3 className="course-title">{course.title}</h3>
        
        <div className="course-meta">
          <span>👤 {course.instructor}</span>
          <span className="course-rating">⭐ {course.rating}</span>
        </div>
        
        <div className="course-meta">
          <span>📚 {course.students.toLocaleString()} students</span>
          <span>⏱️ {course.duration}</span>
        </div>
        
        {showProgress && (
          <>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
            <div className="progress-text">{course.progress}% complete</div>
          </>
        )}
        
        <div className="course-footer">
          <span className="course-price">${course.price}</span>
          <span className="course-level">{course.level}</span>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;