import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mentorMenteeService } from '../services/mentorMenteeService';
import { facultyService } from '../services/facultyService';
import { studentService } from '../services/studentService';

const MentorMentee = () => {
  const [activeTab, setActiveTab] = useState('add');
  const [faculties, setFaculties] = useState([]);
  const [students, setStudents] = useState([]);
  const [summary, setSummary] = useState(null);
  
  // Add Mapping State
  const [addForm, setAddForm] = useState({ facultyId: '', studentId: '' });
  
  // View by Mentor State
  const [selectedMentor, setSelectedMentor] = useState('');
  const [menteesList, setMenteesList] = useState([]);
  
  // View by Mentee State
  const [selectedMentee, setSelectedMentee] = useState('');
  const [mentorInfo, setMentorInfo] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchInitialData();
    fetchSummary();
  }, []);

  const fetchInitialData = async () => {
    try {
      const [facultiesRes, studentsRes] = await Promise.all([
        facultyService.getAll(),
        studentService.getAll()
      ]);
      setFaculties(facultiesRes.data);
      setStudents(studentsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchSummary = async () => {
    try {
      const response = await mentorMenteeService.getCountSummary();
      setSummary(response.data);
    } catch (error) {
      console.error('Error fetching summary:', error);
    }
  };

  const handleAddMapping = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const data = {
        mentor: { facultyId: parseInt(addForm.facultyId) },
        mentee: { studentId: parseInt(addForm.studentId) }
      };
      
      await mentorMenteeService.create(data);
      setSuccess('Mentor-Mentee mapping created successfully!');
      setAddForm({ facultyId: '', studentId: '' });
      fetchSummary();
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Error creating mapping:', error);
      setError('Failed to create mapping. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewMentees = async () => {
    if (!selectedMentor) {
      setError('Please select a mentor');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await mentorMenteeService.getMenteesByMentor(selectedMentor);
      setMenteesList(response.data);
      if (response.data.length === 0) {
        setError('No mentees found for this mentor');
      }
    } catch (error) {
      console.error('Error fetching mentees:', error);
      setError('Failed to fetch mentees');
      setMenteesList([]);
    } finally {
      setLoading(false);
    }
  };

  const handleViewMentor = async () => {
    if (!selectedMentee) {
      setError('Please select a student');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await mentorMenteeService.getMentorByMentee(selectedMentee);
      setMentorInfo(response.data);
    } catch (error) {
      console.error('Error fetching mentor:', error);
      setError('No mentor assigned to this student');
      setMentorInfo(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-4">
        <h2 className="fw-bold">NAAC 2.2.2 - Mentor-Mentee System</h2>
        <p className="text-muted">Manage mentor-mentee relationships and assignments</p>
      </div>

      {/* Summary Cards */}
      {summary && (
        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <div className="card border-primary shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted mb-2">Total Mentors</h6>
                    <h2 className="fw-bold text-primary mb-0">{summary.totalMentors}</h2>
                  </div>
                  <div className="bg-primary bg-opacity-10 p-3 rounded">
                    <i className="bi bi-person-workspace fs-1 text-primary"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card border-success shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted mb-2">Total Mentees</h6>
                    <h2 className="fw-bold text-success mb-0">{summary.totalMentees}</h2>
                  </div>
                  <div className="bg-success bg-opacity-10 p-3 rounded">
                    <i className="bi bi-people fs-1 text-success"></i>
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
            className={`nav-link ${activeTab === 'add' ? 'active' : ''}`}
            onClick={() => setActiveTab('add')}
          >
            <i className="bi bi-plus-circle me-2"></i>
            Add Mapping
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'viewMentees' ? 'active' : ''}`}
            onClick={() => setActiveTab('viewMentees')}
          >
            <i className="bi bi-people me-2"></i>
            View Mentees by Mentor
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'viewMentor' ? 'active' : ''}`}
            onClick={() => setActiveTab('viewMentor')}
          >
            <i className="bi bi-person-check me-2"></i>
            View Mentor by Student
          </button>
        </li>
      </ul>

      {/* Tab Content */}
      <div className="card shadow-sm">
        <div className="card-body">
          {/* Add Mapping Tab */}
          {activeTab === 'add' && (
            <div>
              <h5 className="card-title mb-4">
                <i className="bi bi-link-45deg me-2"></i>
                Create New Mentor-Mentee Mapping
              </h5>
              <form onSubmit={handleAddMapping}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Select Mentor (Faculty) *</label>
                    <select
                      className="form-select"
                      value={addForm.facultyId}
                      onChange={(e) => setAddForm({ ...addForm, facultyId: e.target.value })}
                      required
                    >
                      <option value="">Choose Faculty...</option>
                      {faculties.map((faculty) => (
                        <option key={faculty.facultyId} value={faculty.facultyId}>
                          {faculty.name} ({faculty.designation})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Select Mentee (Student) *</label>
                    <select
                      className="form-select"
                      value={addForm.studentId}
                      onChange={(e) => setAddForm({ ...addForm, studentId: e.target.value })}
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
                        Creating...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-circle me-2"></i>
                        Create Mapping
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* View Mentees by Mentor Tab */}
          {activeTab === 'viewMentees' && (
            <div>
              <h5 className="card-title mb-4">
                <i className="bi bi-people me-2"></i>
                View Mentees under a Mentor
              </h5>
              <div className="row g-3 mb-4">
                <div className="col-md-8">
                  <label className="form-label fw-semibold">Select Mentor</label>
                  <select
                    className="form-select"
                    value={selectedMentor}
                    onChange={(e) => setSelectedMentor(e.target.value)}
                  >
                    <option value="">Choose Mentor...</option>
                    {faculties.map((faculty) => (
                      <option key={faculty.facultyId} value={faculty.facultyId}>
                        {faculty.name} ({faculty.designation})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4 d-flex align-items-end">
                  <button 
                    className="btn btn-primary w-100"
                    onClick={handleViewMentees}
                    disabled={loading || !selectedMentor}
                  >
                    <i className="bi bi-search me-2"></i>
                    View Mentees
                  </button>
                </div>
              </div>

              {menteesList.length > 0 && (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead className="table-light">
                      <tr>
                        <th>ID</th>
                        <th>Student ID</th>
                        <th>Student Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {menteesList.map((mapping) => (
                        <tr key={mapping.id}>
                          <td>{mapping.id}</td>
                          <td>
                            <span className="badge bg-primary">{mapping.mentee.studentId}</span>
                          </td>
                          <td>
                            <i className="bi bi-person-circle text-primary me-2"></i>
                            {mapping.mentee.studentName}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* View Mentor by Student Tab */}
          {activeTab === 'viewMentor' && (
            <div>
              <h5 className="card-title mb-4">
                <i className="bi bi-person-check me-2"></i>
                Find Mentor of a Student
              </h5>
              <div className="row g-3 mb-4">
                <div className="col-md-8">
                  <label className="form-label fw-semibold">Select Student</label>
                  <select
                    className="form-select"
                    value={selectedMentee}
                    onChange={(e) => setSelectedMentee(e.target.value)}
                  >
                    <option value="">Choose Student...</option>
                    {students.map((student) => (
                      <option key={student.studentId} value={student.studentId}>
                        {student.name} ({student.rollNumber})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4 d-flex align-items-end">
                  <button 
                    className="btn btn-primary w-100"
                    onClick={handleViewMentor}
                    disabled={loading || !selectedMentee}
                  >
                    <i className="bi bi-search me-2"></i>
                    Find Mentor
                  </button>
                </div>
              </div>

              {mentorInfo && (
                <div className="card bg-light">
                  <div className="card-body">
                    <h6 className="fw-bold mb-3">Mentor Details</h6>
                    <div className="row">
                      <div className="col-md-6">
                        <p className="mb-2">
                          <strong>Faculty ID:</strong> 
                          <span className="badge bg-primary ms-2">{mentorInfo.mentor.facultyId}</span>
                        </p>
                        <p className="mb-2">
                          <strong>Faculty Name:</strong> {mentorInfo.mentor.facultyName}
                        </p>
                      </div>
                      <div className="col-md-6">
                        <p className="mb-2">
                          <strong>Student ID:</strong> 
                          <span className="badge bg-success ms-2">{mentorInfo.mentee.studentId}</span>
                        </p>
                        <p className="mb-2">
                          <strong>Student Name:</strong> {mentorInfo.mentee.studentName}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MentorMentee;