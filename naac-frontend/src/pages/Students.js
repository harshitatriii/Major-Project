import React, { useState, useEffect } from 'react';

import { studentService } from '../services/studentService';
import { programService } from '../services/programService';
import { semesterService } from '../services/semesterService';
import { schoolService } from '../services/schoolService';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [schools, setSchools] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    programId: '',
    semesterId: '',
    rollNo: '',
    name: '',
    gender: 'Male',
    admissionYear: new Date().getFullYear(),
    status: 'ACTIVE'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [studentsRes, schoolsRes] = await Promise.all([
        studentService.getAll(),
        schoolService.getAll()
      ]);
      setStudents(studentsRes.data);
      setSchools(schoolsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleSchoolChange = async (schoolId) => {
    try {
      const response = await programService.getBySchool(schoolId);
      setPrograms(response.data);
      setSemesters([]);
      setFormData({ ...formData, programId: '', semesterId: '' });
    } catch (error) {
      console.error('Error fetching programs:', error);
    }
  };

  const handleProgramChange = async (programId) => {
    setFormData({ ...formData, programId, semesterId: '' });
    try {
      const response = await semesterService.getByProgram(programId);
      setSemesters(response.data);
    } catch (error) {
      console.error('Error fetching semesters:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await studentService.create(formData);
      setSuccess('Student added successfully!');
      setFormData({
        programId: '',
        semesterId: '',
        rollNo: '',
        name: '',
        gender: 'Male',
        admissionYear: new Date().getFullYear(),
        status: 'ACTIVE'
      });
      setShowModal(false);
      fetchData();
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Error creating student:', error);
      setError('Failed to add student');
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
        <h2 className="fw-bold">Students Management</h2>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <i className="bi bi-plus-circle me-2"></i>
          Add Student
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
          {students.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-person-badge fs-1 text-muted mb-3 d-block"></i>
              <p className="text-muted">No students found. Add your first student to get started.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-light">
                  <tr>
                    <th>Roll No</th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Admission Year</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td className="fw-semibold">{student.rollNo}</td>
                      <td>
                        <i className="bi bi-person-circle text-primary me-2"></i>
                        {student.name}
                      </td>
                      <td>{student.gender}</td>
                      <td>{student.admissionYear}</td>
                      <td>
                        <span className={`badge bg-${student.status === 'ACTIVE' ? 'success' : 'secondary'}`}>
                          {student.status}
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

      {/* Add Student Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <i className="bi bi-person-badge me-2"></i>
                  Add New Student
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
                        onChange={(e) => handleSchoolChange(e.target.value)}
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
                      <label className="form-label">Program *</label>
                      <select
                        className="form-select"
                        value={formData.programId}
                        onChange={(e) => handleProgramChange(e.target.value)}
                        required
                      >
                        <option value="">Select Program</option>
                        {programs.map((program) => (
                          <option key={program.id} value={program.id}>
                            {program.programName}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Semester *</label>
                      <select
                        className="form-select"
                        value={formData.semesterId}
                        onChange={(e) => setFormData({ ...formData, semesterId: e.target.value })}
                        required
                      >
                        <option value="">Select Semester</option>
                        {semesters.map((semester) => (
                          <option key={semester.id} value={semester.id}>
                            {semester.semesterName}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Roll Number *</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g., 23CSE01"
                        value={formData.rollNo}
                        onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Student Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g., Aarav Kumar"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Gender *</label>
                      <select
                        className="form-select"
                        value={formData.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        required
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Admission Year *</label>
                      <input
                        type="number"
                        className="form-control"
                        value={formData.admissionYear}
                        onChange={(e) => setFormData({ ...formData, admissionYear: parseInt(e.target.value) })}
                        min="2000"
                        max="2030"
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
                    Add Student
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

export default Students;