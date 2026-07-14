import React, { useState, useMemo } from 'react';
import lmsData from '../../data/lmsData.json';
import CourseCard from './CourseCard';
import SkeletonCard from '../Common/SkeletonCard';
import { useDebounce } from '../../hooks/useDebounce';

function CourseList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [levelFilter, setLevelFilter] = useState('All');
  const [sortBy, setSortBy] = useState('rating');
  const [isLoading, setIsLoading] = useState(false);
  
  const debouncedSearch = useDebounce(searchTerm, 300);
  
  const { courses, user } = lmsData;
  
  const categories = ['All', ...new Set(courses.map(course => course.category))];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced', 'All Levels'];
  
  // Simulate loading when search changes
  React.useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [debouncedSearch, categoryFilter, levelFilter, sortBy]);
  
  const filteredCourses = useMemo(() => {
    return courses
      .filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                             course.instructor.toLowerCase().includes(debouncedSearch.toLowerCase());
        const matchesCategory = categoryFilter === 'All' || course.category === categoryFilter;
        const matchesLevel = levelFilter === 'All' || course.level === levelFilter;
        return matchesSearch && matchesCategory && matchesLevel;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'students') return b.students - a.students;
        return 0;
      });
  }, [debouncedSearch, categoryFilter, levelFilter, sortBy, courses]);

  return (
    <div className="course-list-page">
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '1.5rem' 
      }}>
        <h1>Explore Courses</h1>
        <span style={{ color: '#7f8c8d' }}>
          {filteredCourses.length} courses found
        </span>
      </div>
      
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search courses by title or instructor..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        
        <select 
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="filter-select"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        
        <select 
          value={levelFilter}
          onChange={(e) => setLevelFilter(e.target.value)}
          className="filter-select"
        >
          {levels.map(level => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
        
        <select 
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="filter-select"
        >
          <option value="rating">⭐ Highest Rated</option>
          <option value="price-low">💰 Price: Low to High</option>
          <option value="price-high">💰 Price: High to Low</option>
          <option value="students">👥 Most Popular</option>
        </select>
      </div>
      
      <div className="course-grid">
        {isLoading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : filteredCourses.length === 0 ? (
          <div style={{ 
            gridColumn: '1/-1', 
            textAlign: 'center', 
            padding: '3rem',
            color: '#7f8c8d' 
          }}>
            <h2>📭 No courses found</h2>
            <p>Try adjusting your search or filters</p>
          </div>
        ) : (
          filteredCourses.map(course => (
            <CourseCard 
              key={course.id} 
              course={course} 
              showProgress={user.enrolledCourses.includes(course.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default CourseList;