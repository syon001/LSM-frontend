import React from 'react';
import { Link } from 'react-router-dom';
import lmsData from '../../data/lmsData.json';
import CourseCard from '../Courses/CourseCard';

function Dashboard() {
  const { user, courses, stats } = lmsData;
  
  const enrolledCourses = courses.filter(course => 
    user.enrolledCourses.includes(course.id)
  );

  const dashboardStats = [
    { icon: '📚', label: 'Enrolled Courses', value: user.enrolledCourses.length },
    { icon: '✅', label: 'Completed', value: user.completedCourses.length },
    { icon: '⏱️', label: 'Hours Learned', value: user.totalHours },
    { icon: '🎓', label: 'Certificates', value: user.certificates },
  ];

  return (
    <div className="dashboard">
      <div className="welcome-section">
        <h1>Welcome back, {user.name}! 👋</h1>
        <p>Continue your learning journey</p>
      </div>

      <div className="stats-grid">
        {dashboardStats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <h3>{stat.label}</h3>
            <div className="stat-value">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="courses-section">
        <div className="section-header">
          <h2>My Courses</h2>
          <Link to="/courses" className="view-all">View All →</Link>
        </div>
        
        <div className="course-grid">
          {enrolledCourses.map(course => (
            <CourseCard key={course.id} course={course} showProgress={true} />
          ))}
        </div>
      </div>

      <div className="courses-section" style={{ marginTop: '3rem' }}>
        <div className="section-header">
          <h2>Recommended Courses</h2>
          <Link to="/courses" className="view-all">Browse All →</Link>
        </div>
        
        <div className="course-grid">
          {courses
            .filter(course => !user.enrolledCourses.includes(course.id))
            .slice(0, 3)
            .map(course => (
              <CourseCard key={course.id} course={course} showProgress={false} />
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default Dashboard;