import React, { useState, useEffect } from 'react';
import { performanceService } from '../services/performanceService';
import { studentService } from '../services/studentService';

const StudentPerformance = () => {
  const [activeTab, setActiveTab] = useState('evaluate');
  const [students, setStudents] = useState([]);
  const [summary, setSummary] = useState(null);
  
  // Evaluate Form State
  const [evaluateForm, setEvaluateForm] = useState({
    studentId: '',
    marksObtained: '',
    totalMarks: 100
  });
  const [evaluationResult, setEvaluationResult] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchStudents();
    fetchSummary();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await studentService.getAll();
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const fetchSummary = async () => {
    try {
      const response = await performanceService.getSummary();
      setSummary(response.data);
    } catch (error) {
      console.error('Error fetching summary:', error);
    }
  };

  const handleEvaluate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setEvaluationResult(null);
    setLoading(true);

    try {
      const response = await performanceService.evaluateStudent(
        evaluateForm.studentId,
        evaluateForm.marksObtained,
        evaluateForm.totalMarks
      );
      
      setEvaluationResult(response.data);
      setSuccess('Student performance evaluated successfully!');
      fetchSummary(); // Refresh summary
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Error evaluating student:', error);
      setError('Failed to evaluate student performance');
    } finally {
      setLoading(false);
    }
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'ADVANCED': return 'success';
      case 'AVERAGE': return 'warning';
      case 'SLOW': return 'danger';
      default: return 'secondary';
    }
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'ADVANCED': return 'trophy';
      case 'AVERAGE': return 'dash-circle';
      case 'SLOW': return 'hourglass-split';
      default: return 'circle';
    }
  };

  const calculatePercentage = (value, total) => {
    if (!total || total === 0) return 0;
    return ((value / total) * 100).toFixed(1);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-4">
        <h2 className="fw-bold">NAAC 2.3.3 - Student Performance Evaluation</h2>
        <p className="text-muted">Evaluate and analyze student performance categories</p>
      </div>

      {/* Summary Cards */}
      {summary && (
        <div className="row g-3 mb-4">
          <div className="col-md-3">
            <div className="card border-info shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted mb-2">Total Students</h6>
                    <h2 className="fw-bold text-info mb-0">{summary.totalStudents}</h2>
                  </div>
                  <div className="bg-info bg-opacity-10 p-3 rounded">
                    <i className="bi bi-people-fill fs-1 text-info"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-success shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted mb-2">Advanced</h6>
                    <h2 className="fw-bold text-success mb-0">{summary.advancedLearners}</h2>
                    <small className="text-muted">
                      {calculatePercentage(summary.advancedLearners, summary.totalStudents)}%
                    </small>
                  </div>
                  <div className="bg-success bg-opacity-10 p-3 rounded">
                    <i className="bi bi-trophy-fill fs-1 text-success"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-warning shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted mb-2">Average</h6>
                    <h2 className="fw-bold text-warning mb-0">{summary.averageLearners}</h2>
                    <small className="text-muted">
                      {calculatePercentage(summary.averageLearners, summary.totalStudents)}%
                    </small>
                  </div>
                  <div className="bg-warning bg-opacity-10 p-3 rounded">
                    <i className="bi bi-dash-circle-fill fs-1 text-warning"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-danger shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted mb-2">Slow Learners</h6>
                    <h2 className="fw-bold text-danger mb-0">{summary.slowLearners}</h2>
                    <small className="text-muted">
                      {calculatePercentage(summary.slowLearners, summary.totalStudents)}%
                    </small>
                  </div>
                  <div className="bg-danger bg-opacity-10 p-3 rounded">
                    <i className="bi bi-hourglass-split fs-1 text-danger"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Alerts */}
      {success && (
        <div className="alert alert-success alert-dismissible fade show">
          <i className="bi bi-check-circle me-2"></i>
          {success}
          <button type="button" className="btn-close" onClick={() => setSuccess('')}></button>
        </div>
      )}

      {error && (
        <div className="alert alert-danger alert-dismissible fade show">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error}
          <button type="button" className="btn-close" onClick={() => setError('')}></button>
        </div>
      )}

      {/* Tabs */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'evaluate' ? 'active' : ''}`}
            onClick={() => setActiveTab('evaluate')}
          >
            <i className="bi bi-clipboard-check me-2"></i>
            Evaluate Performance
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'summary' ? 'active' : ''}`}
            onClick={() => setActiveTab('summary')}
          >
            <i className="bi bi-bar-chart me-2"></i>
            Performance Summary
          </button>
        </li>
      </ul>

      {/* Tab Content */}
      <div className="card shadow-sm">
        <div className="card-body">
          {/* Evaluate Tab */}
          {activeTab === 'evaluate' && (
            <div>
              <h5 className="card-title mb-4">
                <i className="bi bi-pencil-square me-2"></i>
                Evaluate Student Performance
              </h5>
              <form onSubmit={handleEvaluate}>
                <div className="row g-3">
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Select Student *</label>
                    <select
                      className="form-select"
                      value={evaluateForm.studentId}
                      onChange={(e) => setEvaluateForm({ ...evaluateForm, studentId: e.target.value })}
                      required
                    >
                      <option value="">Choose Student...</option>
                      {students.map((student) => (
                        <option key={student.studentId} value={student.studentId}>
                          {student.name} ({student.rollNumber})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Marks Obtained *</label>
                    <input
                      type="number"
                      className="form-control"
                      value={evaluateForm.marksObtained}
                      onChange={(e) => setEvaluateForm({ ...evaluateForm, marksObtained: e.target.value })}
                      min="0"
                      max={evaluateForm.totalMarks}
                      step="0.01"
                      required
                      placeholder="e.g., 84"
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Total Marks *</label>
                    <input
                      type="number"
                      className="form-control"
                      value={evaluateForm.totalMarks}
                      onChange={(e) => setEvaluateForm({ ...evaluateForm, totalMarks: e.target.value })}
                      min="1"
                      step="0.01"
                      required
                      placeholder="e.g., 100"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Evaluating...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-calculator me-2"></i>
                        Evaluate Performance
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Evaluation Result */}
              {evaluationResult && (
                <div className="mt-4">
                  <div className={`card border-${getCategoryColor(evaluationResult.category)} bg-light`}>
                    <div className="card-body">
                      <h5 className="card-title mb-3">
                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                        Evaluation Result
                      </h5>
                      <div className="row">
                        <div className="col-md-6">
                          <p className="mb-2">
                            <strong>Student:</strong> {evaluationResult.studentName}
                          </p>
                          <p className="mb-2">
                            <strong>Marks:</strong> {evaluationResult.marksObtained} / {evaluationResult.totalMarks}
                          </p>
                        </div>
                        <div className="col-md-6">
                          <p className="mb-2">
                            <strong>Percentage:</strong> 
                            <span className="badge bg-info ms-2">{evaluationResult.percentage.toFixed(2)}%</span>
                          </p>
                          <p className="mb-2">
                            <strong>Category:</strong> 
                            <span className={`badge bg-${getCategoryColor(evaluationResult.category)} ms-2`}>
                              <i className={`bi bi-${getCategoryIcon(evaluationResult.category)} me-1`}></i>
                              {evaluationResult.category}
                            </span>
                          </p>
                        </div>
                      </div>
                      
                      {/* Performance Indicator */}
                      <div className="mt-3">
                        <div className="progress" style={{ height: '25px' }}>
                          <div 
                            className={`progress-bar bg-${getCategoryColor(evaluationResult.category)}`}
                            style={{ width: `${evaluationResult.percentage}%` }}
                          >
                            {evaluationResult.percentage.toFixed(1)}%
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Summary Tab */}
          {activeTab === 'summary' && summary && (
            <div>
              <h5 className="card-title mb-4">
                <i className="bi bi-graph-up me-2"></i>
                Performance Distribution Summary
              </h5>

              {/* Visual Bar Chart */}
              <div className="mb-4">
                <h6 className="fw-bold mb-3">Category Distribution</h6>
                <div className="mb-3">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-success">
                      <i className="bi bi-trophy-fill me-2"></i>
                      Advanced Learners
                    </span>
                    <span className="fw-bold">{summary.advancedLearners} students</span>
                  </div>
                  <div className="progress" style={{ height: '30px' }}>
                    <div 
                      className="progress-bar bg-success"
                      style={{ width: `${calculatePercentage(summary.advancedLearners, summary.totalStudents)}%` }}
                    >
                      {calculatePercentage(summary.advancedLearners, summary.totalStudents)}%
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-warning">
                      <i className="bi bi-dash-circle-fill me-2"></i>
                      Average Learners
                    </span>
                    <span className="fw-bold">{summary.averageLearners} students</span>
                  </div>
                  <div className="progress" style={{ height: '30px' }}>
                    <div 
                      className="progress-bar bg-warning"
                      style={{ width: `${calculatePercentage(summary.averageLearners, summary.totalStudents)}%` }}
                    >
                      {calculatePercentage(summary.averageLearners, summary.totalStudents)}%
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-danger">
                      <i className="bi bi-hourglass-split me-2"></i>
                      Slow Learners
                    </span>
                    <span className="fw-bold">{summary.slowLearners} students</span>
                  </div>
                  <div className="progress" style={{ height: '30px' }}>
                    <div 
                      className="progress-bar bg-danger"
                      style={{ width: `${calculatePercentage(summary.slowLearners, summary.totalStudents)}%` }}
                    >
                      {calculatePercentage(summary.slowLearners, summary.totalStudents)}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Statistics Table */}
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead className="table-light">
                    <tr>
                      <th>Category</th>
                      <th>Count</th>
                      <th>Percentage</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <span className="text-success fw-bold">
                          <i className="bi bi-trophy-fill me-2"></i>
                          Advanced
                        </span>
                      </td>
                      <td>{summary.advancedLearners}</td>
                      <td>{calculatePercentage(summary.advancedLearners, summary.totalStudents)}%</td>
                      <td><span className="badge bg-success">Excellent</span></td>
                    </tr>
                    <tr>
                      <td>
                        <span className="text-warning fw-bold">
                          <i className="bi bi-dash-circle-fill me-2"></i>
                          Average
                        </span>
                      </td>
                      <td>{summary.averageLearners}</td>
                      <td>{calculatePercentage(summary.averageLearners, summary.totalStudents)}%</td>
                      <td><span className="badge bg-warning">Satisfactory</span></td>
                    </tr>
                    <tr>
                      <td>
                        <span className="text-danger fw-bold">
                          <i className="bi bi-hourglass-split me-2"></i>
                          Slow
                        </span>
                      </td>
                      <td>{summary.slowLearners}</td>
                      <td>{calculatePercentage(summary.slowLearners, summary.totalStudents)}%</td>
                      <td><span className="badge bg-danger">Needs Attention</span></td>
                    </tr>
                    <tr className="table-light">
                      <td className="fw-bold">Total</td>
                      <td className="fw-bold">{summary.totalStudents}</td>
                      <td className="fw-bold">100%</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentPerformance;