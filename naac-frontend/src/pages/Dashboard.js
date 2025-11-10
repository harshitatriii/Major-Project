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
        programs: 0, // Can be calculated from programs API
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { title: 'Total Schools', count: stats.schools, icon: 'building', color: 'primary', link: '/schools' },
    { title: 'Total Faculties', count: stats.faculties, icon: 'people', color: 'success', link: '/faculties' },
    { title: 'Total Students', count: stats.students, icon: 'person-badge', color: 'info', link: '/students' },
    { title: 'Total Programs', count: stats.programs, icon: 'book', color: 'warning', link: '/programs' },
  ];

  const quickActions = [
    { title: 'Add School', icon: 'building', link: '/schools', color: 'primary' },
    { title: 'Add Faculty', icon: 'people', link: '/faculties', color: 'success' },
    { title: 'Add Student', icon: 'person-badge', link: '/students', color: 'info' },
    { title: 'View Reports', icon: 'file-bar-graph', link: '/reports', color: 'danger' },
  ];

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Dashboard</h2>
        <button className="btn btn-primary">
          <i className="bi bi-calendar-event me-2"></i>
          Academic Year 2024-25
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="row g-4 mb-4">
        {statCards.map((card, index) => (
          <div key={index} className="col-md-6 col-xl-3">
            <div className={`card border-${card.color} shadow-sm h-100`}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted mb-2">{card.title}</h6>
                    <h2 className="fw-bold mb-0">{card.count}</h2>
                  </div>
                  <div className={`bg-${card.color} bg-opacity-10 p-3 rounded`}>
                    <i className={`bi bi-${card.icon} fs-1 text-${card.color}`}></i>
                  </div>
                </div>
                <Link to={card.link} className="stretched-link"></Link>
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
              <h5 className="card-title mb-4">Quick Actions</h5>
              <div className="row g-3">
                {quickActions.map((action, index) => (
                  <div key={index} className="col-md-6 col-lg-3">
                    <Link to={action.link} className="text-decoration-none">
                      <div className={`card bg-${action.color} bg-opacity-10 border-0 h-100 hover-shadow`}>
                        <div className="card-body text-center py-4">
                          <i className={`bi bi-${action.icon} fs-1 text-${action.color} mb-3 d-block`}></i>
                          <h6 className={`text-${action.color} mb-0`}>{action.title}</h6>
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

      {/* Recent Activity */}
      <div className="row">
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title mb-4">Recent Activity</h5>
              <div className="list-group list-group-flush">
                <div className="list-group-item">
                  <div className="d-flex align-items-center">
                    <div className="bg-primary bg-opacity-10 p-2 rounded me-3">
                      <i className="bi bi-person-plus text-primary"></i>
                    </div>
                    <div className="flex-grow-1">
                      <p className="mb-0 fw-semibold">New student added</p>
                      <small className="text-muted">Aarav Kumar - B.Tech CSE</small>
                    </div>
                    <small className="text-muted">2 hours ago</small>
                  </div>
                </div>
                <div className="list-group-item">
                  <div className="d-flex align-items-center">
                    <div className="bg-success bg-opacity-10 p-2 rounded me-3">
                      <i className="bi bi-journal-check text-success"></i>
                    </div>
                    <div className="flex-grow-1">
                      <p className="mb-0 fw-semibold">Faculty assignment created</p>
                      <small className="text-muted">Prof. John Doe assigned to Data Structures</small>
                    </div>
                    <small className="text-muted">5 hours ago</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title mb-4">NAAC Criteria</h5>
              <div className="list-group list-group-flush">
                <Link to="/reports" className="list-group-item list-group-item-action">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-bar-chart text-primary me-3"></i>
                    <div>
                      <p className="mb-0 fw-semibold">2.2.1 Student-Teacher Ratio</p>
                      <small className="text-muted">View Report</small>
                    </div>
                  </div>
                </Link>
                <div className="list-group-item text-muted">
                  <i className="bi bi-hourglass-split me-3"></i>
                  <span>2.2.2 Mentor-Mentee (Coming Soon)</span>
                </div>
                <div className="list-group-item text-muted">
                  <i className="bi bi-hourglass-split me-3"></i>
                  <span>2.3.3 Learner Analytics (Coming Soon)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;