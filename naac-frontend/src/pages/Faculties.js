import React, { useState, useEffect } from 'react';

import { facultyService } from '../services/facultyService';
import { schoolService } from '../services/schoolService';

const Faculties = () => {
  const [faculties, setFaculties] = useState([]);
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  // Can be removed.
  const [totalFaculties, setTotalFaculties] = useState(0);
  const [formData, setFormData] = useState({
    schoolId: '',
    name: '',
    designation: 'Assistant Professor',
    status: 'ACTIVE',
    joiningDate: new Date().toISOString().split('T')[0]
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [facultiesRes, schoolsRes] = await Promise.all([
        facultyService.getAll(),
        schoolService.getAll()
      ]);
      setFaculties(facultiesRes.data);
      setSchools(schoolsRes.data);
      // adding console log to verify data
      console.log('Faculties fetched:', facultiesRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // Convert date to ISO format with time
      const submitData = {
        ...formData,
        joiningDate: new Date(formData.joiningDate).toISOString()
      };
      
      await facultyService.create(submitData);
      setSuccess('Faculty added successfully!');
      setFormData({
        schoolId: '',
        name: '',
        designation: 'Assistant Professor',
        status: 'ACTIVE',
        joiningDate: new Date().toISOString().split('T')[0]
      });
      setShowModal(false);
      fetchData();
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Error creating faculty:', error);
      setError('Failed to add faculty');
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
        <h2 className="fw-bold">Faculty Management</h2>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <i className="bi bi-plus-circle me-2"></i>
          Add Faculty
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

      <div className="card shadow-sm">
        <div className="card-body">
          {faculties.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-people fs-1 text-muted mb-3 d-block"></i>
              <p className="text-muted">No faculty members found. Add your first faculty to get started.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Designation</th>
                    <th>School</th>
                    <th>Joining Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {faculties.map((faculty) => (
                    <tr key={faculty.id}>
                      <td>{faculty.id}</td>
                      <td>
                        <i className="bi bi-person-circle text-primary me-2"></i>
                        {faculty.name}
                      </td>
                      <td>{faculty.designation}</td>
                      <td>{schools.find(s => s.id === faculty.schoolId)?.name || 'N/A'}</td>
                      <td>{new Date(faculty.joiningDate).toLocaleDateString()}</td>
                      <td>
                        <span className={`badge bg-${faculty.status === 'ACTIVE' ? 'success' : 'secondary'}`}>
                          {faculty.status}
                        </span>
                      </td>
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

      {/* Add Faculty Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <i className="bi bi-people me-2"></i>
                  Add New Faculty
                </h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">School *</label>
                      <select
                        className="form-select"
                        value={formData.schoolId}
                        onChange={(e) => setFormData({ ...formData, schoolId: e.target.value })}
                        required
                      >
                        <option value="">Select School</option>
                        {schools.map((school) => (
                          <option key={school.id} value={school.id}>
                            {school.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Faculty Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g., Dr. John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Designation *</label>
                      <select
                        className="form-select"
                        value={formData.designation}
                        onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                        required
                      >
                        <option value="Professor">Professor</option>
                        <option value="Associate Professor">Associate Professor</option>
                        <option value="Assistant Professor">Assistant Professor</option>
                        <option value="Lecturer">Lecturer</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Joining Date *</label>
                      <input
                        type="date"
                        className="form-control"
                        value={formData.joiningDate}
                        onChange={(e) => setFormData({ ...formData, joiningDate: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Status *</label>
                      <select
                        className="form-select"
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        required
                      >
                        <option value="ACTIVE">Active</option>
                        <option value="INACTIVE">Inactive</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    <i className="bi bi-check-circle me-2"></i>
                    Add Faculty
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

export default Faculties;