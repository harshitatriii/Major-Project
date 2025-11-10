import React, { useState, useEffect } from 'react';
import { semesterService } from '../services/semesterService';
import { programService } from '../services/programService';
import { schoolService } from '../services/schoolService';

const Semesters = () => {
  const [semesters, setSemesters] = useState([]);
  const [schools, setSchools] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    programId: '',
    semesterName: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchSchools();
  }, []);

  useEffect(() => {
    if (selectedSchool) {
      fetchPrograms(selectedSchool);
    }
  }, [selectedSchool]);

  useEffect(() => {
    if (selectedProgram) {
      fetchSemesters(selectedProgram);
    }
  }, [selectedProgram]);

  const fetchSchools = async () => {
    try {
      const response = await schoolService.getAll();
      setSchools(response.data);
      if (response.data.length > 0) {
        setSelectedSchool(response.data[0].schoolId);
      }
    } catch (error) {
      console.error('Error fetching schools:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPrograms = async (schoolId) => {
    try {
      const response = await programService.getBySchool(schoolId);
      setPrograms(response.data);
      if (response.data.length > 0) {
        setSelectedProgram(response.data[0].programId);
      }
    } catch (error) {
      console.error('Error fetching programs:', error);
      setPrograms([]);
    }
  };

  const fetchSemesters = async (programId) => {
    try {
      const response = await semesterService.getByProgram(programId);
      setSemesters(response.data);
    } catch (error) {
      console.error('Error fetching semesters:', error);
      setSemesters([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await semesterService.create(formData);
      setSuccess('Semester added successfully!');
      setFormData({ programId: '', semesterName: '' });
      setShowModal(false);
      if (selectedProgram) {
        fetchSemesters(selectedProgram);
      }
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Error creating semester:', error);
      setError('Failed to create semester');
    }
  };

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
        <h2 className="fw-bold">Semesters Management</h2>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <i className="bi bi-plus-circle me-2"></i>
          Add Semester
        </button>
      </div>

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

      <div className="card shadow-sm mb-3">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold">Select School</label>
              <select
                className="form-select"
                value={selectedSchool}
                onChange={(e) => setSelectedSchool(e.target.value)}
              >
                {schools.map((school) => (
                  <option key={school.schoolId} value={school.schoolId}>
                    {school.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">Select Program</label>
              <select
                className="form-select"
                value={selectedProgram}
                onChange={(e) => setSelectedProgram(e.target.value)}
              >
                {programs.map((program) => (
                  <option key={program.programId} value={program.programId}>
                    {program.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          {semesters.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-calendar3 fs-1 text-muted mb-3 d-block"></i>
              <p className="text-muted">No semesters found for this program.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Semester Name</th>
                    <th>Program</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {semesters.map((semester) => (
                    <tr key={semester.semesterId}>
                      <td>{semester.semesterId}</td>
                      <td>
                        <i className="bi bi-calendar-check text-primary me-2"></i>
                        {semester.semesterNumber}
                      </td>
                      {/* <td>{programs.find(p => p.programId === semester.program?.name)}</td> */}
                       <td>{semester.programName}</td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary me-2">
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button className="btn btn-sm btn-outline-danger">
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <i className="bi bi-calendar3 me-2"></i>
                  Add New Semester
                </h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Program *</label>
                    <select
                      className="form-select"
                      value={formData.programId}
                      onChange={(e) => setFormData({ ...formData, programId: e.target.value })}
                      required
                    >
                      <option value="">Select Program</option>
                      {programs.map((program) => (
                        <option key={program.id} value={program.id}>
                          {program.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Semester Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g., Semester 1"
                      value={formData.semesterName}
                      onChange={(e) => setFormData({ ...formData, semesterName: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    <i className="bi bi-check-circle me-2"></i>
                    Add Semester
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Semesters;