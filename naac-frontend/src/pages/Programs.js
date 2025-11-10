import React, { useState, useEffect } from 'react';
import { schoolService } from '../services/schoolService';
import { programService } from '../services/programService';

const Programs = () => {
  const [schools, setSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState('');
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ schoolId: '', name: '', programType: '' });
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

  const fetchSchools = async () => {
    try {
      const response = await schoolService.getAll();
      setSchools(response.data);
      if (response.data.length > 0) {
        setSelectedSchool(response.data[0].schoolId);
      }
    } catch (error) {
      console.error('Error fetching schools:', error);
      setError('Failed to load schools');
    } finally {
      setLoading(false);
    }
  };

  const fetchPrograms = async (schoolId) => {
    try {
      const response = await programService.getBySchool(schoolId);
      console.log("Programs API response:", response.data);
      setPrograms(response.data);
    } catch (error) {
      console.error('Error fetching programs:', error);
      setPrograms([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.schoolId || !formData.name.trim() || !formData.programType.trim()) {
      setError('All fields are required');
      return;
    }

    try {
      // send correct payload according to backend DTO
      const payload = {
        name: formData.name,
        programType: formData.programType,
        schoolId: Number(formData.schoolId),
      };

      await programService.create(payload);
      setSuccess('Program added successfully!');
      setFormData({ schoolId: '', name: '', programType: '' });
      setShowModal(false);
      if (selectedSchool) {
        fetchPrograms(selectedSchool);
      }
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Error creating program:', error);
      setError('Failed to create program');
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
        <h2 className="fw-bold">Programs Management</h2>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <i className="bi bi-plus-circle me-2"></i>
          Add Program
        </button>
      </div>

      {success && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          <i className="bi bi-check-circle me-2"></i>
          {success}
          <button type="button" className="btn-close" onClick={() => setSuccess('')}></button>
        </div>
      )}

      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error}
          <button type="button" className="btn-close" onClick={() => setError('')}></button>
        </div>
      )}

      {/* School Filter */}
      <div className="card shadow-sm mb-3">
        <div className="card-body">
          <div className="row align-items-center">
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
          </div>
        </div>
      </div>

      {/* Programs Table */}
      <div className="card shadow-sm">
        <div className="card-body">
          {programs.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-book fs-1 text-muted mb-3 d-block"></i>
              <p className="text-muted">No programs found for this school.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Program Name</th>
                    <th>Program Type</th>
                    <th>School</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {programs.map((program) => (
                    <tr key={program.programId}>
                      <td>{program.programId}</td>
                      <td>{program.name}</td>
                      <td>{program.programType}</td>
                      <td>{program.schoolName}</td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary me-2">
                          <i className="bi bi-pencil"></i> Edit
                        </button>
                        <button className="btn btn-sm btn-outline-danger">
                          <i className="bi bi-trash"></i> Delete
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

      {/* Add Program Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <i className="bi bi-book me-2"></i>
                  Add New Program
                </h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  {/* School Select */}
                  <div className="mb-3">
                    <label className="form-label">School *</label>
                    <select
                      className="form-select"
                      value={formData.schoolId}
                      onChange={(e) => setFormData({ ...formData, schoolId: e.target.value })}
                      required
                    >
                      <option value="">Select School</option>
                      {schools.map((school) => (
                        <option key={school.schoolId} value={school.schoolId}>
                          {school.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Program Name */}
                  <div className="mb-3">
                    <label className="form-label">Program Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g., B.Tech Computer Science"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  {/* Program Type */}
                  <div className="mb-3">
                    <label className="form-label">Program Type *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g., Undergraduate, Postgraduate"
                      value={formData.programType}
                      onChange={(e) => setFormData({ ...formData, programType: e.target.value })}
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
                    Add Program
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

export default Programs;
