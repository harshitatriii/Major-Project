import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { schoolService } from '../services/schoolService';
import { facultyService } from '../services/facultyService';
import { studentService } from '../services/studentService';

const Dashboard = () => {
  const [stats, setStats] = useState({
    schools: 0,
    faculties: 0,
    students: 0,
    programs: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [schoolsRes, facultiesRes, studentsRes] = await Promise.all([
        schoolService.getAll(),
        facultyService.getAll(),
        studentService.getAll(),
      ]);

      setStats({
        schools: schoolsRes.data.length,
        faculties: facultiesRes.data.length,
        students: studentsRes.data.length,
        programs: 0,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { 
      title: 'Total Schools', 
      count: stats.schools, 
      icon: 'building', 
      color: 'primary', 
      link: '/schools',
      description: 'Academic institutions'
    },
    { 
      title: 'Total Faculties', 
      count: stats.faculties, 
      icon: 'people', 
      color: 'success', 
      link: '/faculties',
      description: 'Teaching staff'
    },
    { 
      title: 'Total Students', 
      count: stats.students, 
      icon: 'person-badge', 
      color: 'info', 
      link: '/students',
      description: 'Enrolled students'
    },
    { 
      title: 'Total Programs', 
      count: stats.programs, 
      icon: 'book', 
      color: 'warning', 
      link: '/programs',
      description: 'Academic programs'
    },
  ];

  const naacFeatures = [
    {
      id: '2.2.1',
      title: 'Faculty-Student Ratio',
      description: 'Calculate and monitor the optimal faculty-to-student ratio for academic excellence. Generate NAAC-compliant reports instantly.',
      icon: 'bi-calculator',
      color: 'primary',
      link: '/reports',
      badge: 'Report Ready',
      features: ['Calculate Ratios', 'Export Reports', 'NAAC Compliance']
    },
    {
      id: '2.2.2',
      title: 'Mentor-Mentee System',
      description: 'Efficiently manage mentor-mentee relationships, track meetings, and monitor student guidance for holistic development.',
      icon: 'bi-people-fill',
      color: 'success',
      link: '/mentor-mentee',
      badge: 'Active',
      features: ['Assign Mentors', 'Track Meetings', 'View Analytics']
    },
    {
      id: '2.3.3',
      title: 'Performance Analytics',
      description: 'Identify slow and advanced learners through intelligent performance evaluation. Support personalized learning strategies.',
      icon: 'bi-graph-up-arrow',
      color: 'info',
      link: '/performance',
      badge: 'AI-Powered',
      features: ['Auto Classification', 'Performance Charts', 'Custom Reports']
    }
  ];

  const quickActions = [
    { title: 'Add School', icon: 'building-add', link: '/schools', color: 'primary', desc: 'Register new institution' },
    { title: 'Add Faculty', icon: 'person-plus', link: '/faculties', color: 'success', desc: 'Onboard teaching staff' },
    { title: 'Add Student', icon: 'person-fill-add', link: '/students', color: 'info', desc: 'Enroll new students' },
    { title: 'View Reports', icon: 'file-bar-graph', link: '/reports', color: 'danger', desc: 'Generate NAAC reports' },
  ];

  const recentActivities = [
    {
      type: 'student',
      icon: 'person-plus',
      color: 'primary',
      title: 'New student enrolled',
      description: 'Amit Raj joined B.Tech CSE Program',
      time: '2 hours ago'
    },
    {
      type: 'assignment',
      icon: 'journal-check',
      color: 'success',
      title: 'Faculty assignment updated',
      description: 'Dr. Monika Khatkar assigned to Data Structures course',
      time: '5 hours ago'
    },
    {
      type: 'mentor',
      icon: 'people',
      color: 'info',
      title: 'Mentor-Mentee mapping created',
      description: '15 new mentor-mentee relationships established',
      time: '1 day ago'
    },
    {
      type: 'report',
      icon: 'file-earmark-check',
      color: 'warning',
      title: 'NAAC Report generated',
      description: 'Student-Teacher Ratio report for Semester 5 completed',
      time: '2 days ago'
    }
  ];

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted">Loading dashboard data...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header with Welcome Message */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div>
            <h2 className="fw-bold mb-1">
              <i className="bi bi-speedometer2 me-2 text-primary"></i>
              Dashboard Overview
            </h2>
            <p className="text-muted mb-0">
              Welcome to NAAC Evaluation System - Your comprehensive solution for academic excellence
            </p>
          </div>
          <button className="btn btn-primary">
            <i className="bi bi-calendar-event me-2"></i>
            Academic Year 2024-25
          </button>
        </div>
      </div>

      {/* System Capabilities Banner */}
      <div className="alert alert-info border-0 shadow-sm mb-4" role="alert">
        <div className="d-flex align-items-center">
          <div className="bg-info bg-opacity-10 p-3 rounded-circle me-3">
            <i className="bi bi-lightbulb-fill fs-4 text-info"></i>
          </div>
          <div className="flex-grow-1">
            <h6 className="alert-heading mb-1 fw-bold">What can you do with this system?</h6>
            <p className="mb-0 small">
              <strong>Track Faculty-Student Ratios</strong> • <strong>Manage Mentor-Mentee Programs</strong> • 
              <strong>Analyze Student Performance</strong> • Generate NAAC-compliant reports instantly
            </p>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="row g-4 mb-4">
        {statCards.map((card, index) => (
          <div key={index} className="col-md-6 col-xl-3">
            <div className={`card border-${card.color} shadow-sm h-100 hover-lift`} style={{ position: 'relative' }}>
              <Link to={card.link} className="text-decoration-none" style={{ color: 'inherit' }}>
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className={`bg-${card.color} bg-opacity-10 p-3 rounded-3`}>
                      <i className={`bi bi-${card.icon} fs-2 text-${card.color}`}></i>
                    </div>
                    <span className={`badge bg-${card.color} bg-opacity-10 text-${card.color}`}>
                      Active
                    </span>
                  </div>
                  <h3 className="fw-bold mb-1 text-dark">{card.count}</h3>
                  <h6 className="text-muted mb-1">{card.title}</h6>
                  <small className="text-muted">{card.description}</small>
                </div>
                <div className={`card-footer bg-${card.color} bg-opacity-5 border-0 py-2`}>
                  <small className={`text-dark fw-semibold d-block`}>
                    View Details <i className="bi bi-arrow-right ms-1"></i>
                  </small>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* NAAC Criteria Feature Cards */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-bold mb-0">
              <i className="bi bi-star-fill text-warning me-2"></i>
              NAAC Evaluation Modules
            </h5>
            <span className="badge bg-success">3 Active Modules</span>
          </div>
        </div>
        {naacFeatures.map((feature, index) => (
          <div key={index} className="col-lg-4 mb-3">
            <div className={`card border-${feature.color} shadow-sm h-100`}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div className={`bg-${feature.color} bg-opacity-10 p-3 rounded-3`}>
                    <i className={`${feature.icon} fs-1 text-${feature.color}`}></i>
                  </div>
                  <span className={`badge bg-${feature.color}`}>{feature.badge}</span>
                </div>
                
                <div className="mb-3">
                  <span className={`badge bg-${feature.color} bg-opacity-10 text-${feature.color} mb-2`}>
                    NAAC {feature.id}
                  </span>
                  <h5 className="fw-bold mb-2">{feature.title}</h5>
                  <p className="text-muted small mb-3">{feature.description}</p>
                </div>

                <div className="mb-3">
                  {feature.features.map((item, idx) => (
                    <div key={idx} className="d-flex align-items-center mb-2">
                      <i className={`bi bi-check-circle-fill text-${feature.color} me-2`}></i>
                      <small className="text-muted">{item}</small>
                    </div>
                  ))}
                </div>
                
                <Link to={feature.link} className={`btn btn-${feature.color} w-100`}>
                  <i className="bi bi-arrow-right-circle me-2"></i>
                  Access Module
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title mb-4">
                <i className="bi bi-lightning-charge-fill text-warning me-2"></i>
                Quick Actions
              </h5>
              <div className="row g-3">
                {quickActions.map((action, index) => (
                  <div key={index} className="col-md-6 col-lg-3">
                    <Link to={action.link} className="text-decoration-none">
                      <div className={`card bg-${action.color} bg-opacity-10 border-0 h-100 hover-shadow`}>
                        <div className="card-body text-center py-4">
                          <i className={`bi bi-${action.icon} fs-1 text-${action.color} mb-2 d-block`}></i>
                          <h6 className={`text-${action.color} mb-1 fw-bold`}>{action.title}</h6>
                          <small className="text-muted">{action.desc}</small>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity and System Info */}
      <div className="row">
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-header bg-white border-0 pt-3">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0 fw-bold">
                  <i className="bi bi-clock-history text-primary me-2"></i>
                  Recent Activity
                </h5>
                <span className="badge bg-primary bg-opacity-10 text-primary">Live Updates</span>
              </div>
            </div>
            <div className="card-body">
              <div className="list-group list-group-flush">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="list-group-item border-0 px-0">
                    <div className="d-flex align-items-start">
                      <div className={`bg-${activity.color} bg-opacity-10 p-2 rounded-circle me-3 flex-shrink-0`}>
                        <i className={`bi bi-${activity.icon} text-${activity.color} fs-5`}></i>
                      </div>
                      <div className="flex-grow-1">
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <p className="mb-1 fw-semibold">{activity.title}</p>
                            <p className="mb-0 text-muted small">{activity.description}</p>
                          </div>
                          <span className="badge bg-light text-muted">{activity.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-3">
                <button className="btn btn-outline-primary btn-sm">
                  <i className="bi bi-arrow-clockwise me-2"></i>
                  View All Activities
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-lg-4">
          {/* System Status Card */}
          <div className="card shadow-sm mb-3">
            <div className="card-header bg-success text-white">
              <h6 className="mb-0">
                <i className="bi bi-shield-check me-2"></i>
                System Status
              </h6>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted">Database</span>
                <span className="badge bg-success">
                  <i className="bi bi-check-circle me-1"></i>
                  Connected
                </span>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted">API Services</span>
                <span className="badge bg-success">
                  <i className="bi bi-check-circle me-1"></i>
                  Running
                </span>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-muted">NAAC Compliance</span>
                <span className="badge bg-success">
                  <i className="bi bi-check-circle me-1"></i>
                  Active
                </span>
              </div>
            </div>
          </div>

          {/* Help & Resources Card */}
          <div className="card shadow-sm">
            <div className="card-header bg-info text-white">
              <h6 className="mb-0">
                <i className="bi bi-question-circle me-2"></i>
                Help & Resources
              </h6>
            </div>
            <div className="card-body">
              <div className="list-group list-group-flush">
                <a href="#" className="list-group-item list-group-item-action border-0 px-0">
                  <i className="bi bi-book text-primary me-2"></i>
                  <span className="small">User Documentation</span>
                </a>
                <a href="#" className="list-group-item list-group-item-action border-0 px-0">
                  <i className="bi bi-file-earmark-text text-success me-2"></i>
                  <span className="small">NAAC Guidelines</span>
                </a>
                <a href="#" className="list-group-item list-group-item-action border-0 px-0">
                  <i className="bi bi-play-circle text-danger me-2"></i>
                  <span className="small">Video Tutorials</span>
                </a>
                <a href="#" className="list-group-item list-group-item-action border-0 px-0">
                  <i className="bi bi-headset text-info me-2"></i>
                  <span className="small">Contact Support</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;