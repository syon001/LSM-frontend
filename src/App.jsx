import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Sidebar from './components/Layout/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import CourseList from './components/Courses/CourseList';
import CourseDetail from './components/CourseDetail/CourseDetail';
import ErrorBoundary from './components/Common/ErrorBoundary';
import './styles/App.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <ErrorBoundary>
      <Router>
        <div className="app">
          <Navbar 
            onHamburgerClick={toggleSidebar} 
            isSidebarOpen={isSidebarOpen} 
          />
          
          <div className="main-content">
            <Sidebar 
              isMobile={isMobile} 
              isOpen={isSidebarOpen} 
              onClose={closeSidebar} 
            />
            
            {isMobile && isSidebarOpen && (
              <div 
                className="sidebar-overlay active"
                onClick={closeSidebar}
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'rgba(0, 0, 0, 0.5)',
                  zIndex: 998,
                }}
              />
            )}
            
            <div className="content-area">
              <ErrorBoundary>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/courses" element={<CourseList />} />
                  <Route path="/course/:id" element={<CourseDetail />} />
                </Routes>
              </ErrorBoundary>
            </div>
          </div>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;