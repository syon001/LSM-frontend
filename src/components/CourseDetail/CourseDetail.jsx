import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import lmsData from '../../data/lmsData.json';

function CourseDetail() {
  const { id } = useParams();
  const { courses } = lmsData;
  const [expandedModules, setExpandedModules] = useState([1]);
  
  const course = courses.find(c => c.id === parseInt(id));
  
  if (!course) {
    return <div className="course-detail">Course not found</div>;
  }

  const toggleModule = (moduleId) => {
    setExpandedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);
  const completedLessons = course.modules.reduce((acc, module) => 
    acc + module.lessons.filter(lesson => lesson.completed).length, 0
  );

  return (
    <div className="course-detail">
      <div className="course-detail-header">
        <span className="course-category">{course.category}</span>
        <h1>{course.title}</h1>
        
        <div className="course-detail-meta">
          <span>👤 Instructor: {course.instructor}</span>
          <span>⭐ Rating: {course.rating} / 5.0</span>
          <span>📚 {course.students.toLocaleString()} students</span>
          <span>⏱️ {course.duration}</span>
          <span>📊 Level: {course.level}</span>
        </div>
        
        <p style={{ marginTop: '1rem', fontSize: '1.1rem', lineHeight: '1.6' }}>
          {course.description}
        </p>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginTop: '1.5rem' }}>
          <span className="course-price" style={{ fontSize: '2rem' }}>${course.price}</span>
          <button className="enroll-button">
            {course.progress > 0 ? 'Continue Learning' : 'Enroll Now'}
          </button>
        </div>
        
        {course.progress > 0 && (
          <div style={{ marginTop: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>Your Progress</span>
              <span>{completedLessons}/{totalLessons} lessons completed</span>
            </div>
            <div className="progress-bar" style={{ height: '12px' }}>
              <div 
                className="progress-fill" 
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
      
      <div className="module-list">
        <h2 style={{ marginBottom: '1.5rem' }}>Course Content</h2>
        
        {course.modules.map(module => (
          <div key={module.id} className="module-item">
            <div 
              className="module-header"
              onClick={() => toggleModule(module.id)}
            >
              <span>Module {module.id}: {module.title}</span>
              <span>
                {module.lessons.length} lessons • 
                {module.lessons.filter(l => l.completed).length} completed
                {expandedModules.includes(module.id) ? ' ▼' : ' ▶'}
              </span>
            </div>
            
            {expandedModules.includes(module.id) && (
              <div className="lesson-list">
                {module.lessons.map(lesson => (
                  <div key={lesson.id} className="lesson-item">
                    <div className={`lesson-checkbox ${lesson.completed ? 'completed' : ''}`}>
                      {lesson.completed ? '✓' : ''}
                    </div>
                    <div className="lesson-info">
                      <div>{lesson.title}</div>
                    </div>
                    <div className="lesson-duration">{lesson.duration}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseDetail;