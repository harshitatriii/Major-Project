import React, { useState, useEffect } from 'react';
import { mentorMenteeService } from '../services/mentorMenteeService';
import { facultyService } from '../services/facultyService';
import { studentService } from '../services/studentService';

const MentorMentee = () => {
  const [activeTab, setActiveTab] = useState('add');
  const [faculties, setFaculties] = useState([]);
  const [students, setStudents] = useState([]);
  const [summary, setSummary] = useState(null);

  const [addForm, setAddForm] = useState({ facultyId: '', studentId: '' });
  const [selectedMentor, setSelectedMentor] = useState('');
  const [menteesList, setMenteesList] = useState([]);
  const [selectedMentee, setSelectedMentee] = useState('');
  const [mentorInfo, setMentorInfo] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [totalMentees, setTotalMentees] = useState(0);


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
      const [facRes, stuRes] = await Promise.all([
        facultyService.getAll(),
        studentService.getAll()
      ]);

      setSummary({
        totalMentors: facRes.data.length,
        totalMentees: stuRes.data.length
      });

    } catch (error) {
      console.error('Error generating summary:', error);
    }
  };

  const handleAddMapping = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const request = {
        facultyId: parseInt(addForm.facultyId),
        studentId: parseInt(addForm.studentId)
      };

      await mentorMenteeService.create(request);
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
      setTotalMentees(response.data.length);

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

    // Take the first element if it exists
    if (response.data && response.data.length > 0) {
      setMentorInfo(response.data[0]);
    } else {
      setMentorInfo(null);
      setError('No mentor assigned to this student');
    }

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
      <div className="mb-4">
        <h2 className="fw-bold">NAAC 2.2.2 - Mentor-Mentee System</h2>
      </div>

      {summary && (
        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <div className="card border-primary shadow-sm">
              <div className="card-body">
                <h6 className="text-muted mb-2">Total Mentors</h6>
                <h2 className="fw-bold text-primary mb-0">{summary.totalMentors}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card border-success shadow-sm">
              <div className="card-body">
                <h6 className="text-muted mb-2">Total Mentees</h6>
                <h2 className="fw-bold text-success mb-0">{summary.totalMentees}</h2>
              </div>
            </div>
          </div>
        </div>
      )}

      {success && (
        <div className="alert alert-success">{success}</div>
      )}

      {error && (
        <div className="alert alert-danger">{error}</div>
      )}

      {/* Tabs */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'add' ? 'active' : ''}`} onClick={() => setActiveTab('add')}>
            Add Mapping
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'viewMentees' ? 'active' : ''}`} onClick={() => setActiveTab('viewMentees')}>
            View Mentees by Mentor
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'viewMentor' ? 'active' : ''}`} onClick={() => setActiveTab('viewMentor')}>
            View Mentor by Student
          </button>
        </li>
      </ul>

      <div className="card shadow-sm">
        <div className="card-body">

          {/* ADD MAPPING */}
          {activeTab === 'add' && (
            <form onSubmit={handleAddMapping}>
              <div className="row g-3">

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Select Mentor</label>
                  <select
                    className="form-select"
                    value={addForm.facultyId}
                    onChange={(e) => setAddForm({ ...addForm, facultyId: e.target.value })}
                  >
                    <option value="">Choose Faculty...</option>
                    {faculties.map((f) => (
                      <option key={f.facultyId} value={f.facultyId}>{f.name}</option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Select Student</label>
                  <select
                    className="form-select"
                    value={addForm.studentId}
                    onChange={(e) => setAddForm({ ...addForm, studentId: e.target.value })}
                  >
                    <option value="">Choose Student...</option>
                    {students.map((s) => (
                      <option key={s.studentId} value={s.studentId}>{s.name}</option>
                    ))}
                  </select>
                </div>

              </div>

              <button className="btn btn-primary mt-4" disabled={loading}>
                {loading ? "Creating..." : "Create Mapping"}
              </button>
            </form>
          )}

          {/* VIEW MENTEES */}
          {activeTab === 'viewMentees' && (
            <>
              <div className="row g-3 mb-4">
                <div className="col-md-8">
                  <select
                    className="form-select"
                    value={selectedMentor}
                    onChange={(e) => setSelectedMentor(e.target.value)}
                  >
                    <option value="">Choose Mentor...</option>
                    {faculties.map((f) => (
                      <option key={f.facultyId} value={f.facultyId}>{f.name}</option>
                    ))}
                  </select>
                </div>

                <div className="col-md-4">
                  <button className="btn btn-primary w-100" onClick={handleViewMentees}>
                    View Mentees
                  </button>
                </div>
              </div>

              {menteesList.length > 0 && (
                <>
                    <p><strong>Total Mentees: {totalMentees}</strong></p>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Student Name</th>
                      <th>Assigned At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {menteesList.map((m) => (
                      <tr key={m.id}>
                        <td>{m.id}</td>
                        <td>{m.studentName}</td>
                        <td>{new Date(m.assignedAt).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                </>
              )}
            </>
          )}

          {/* VIEW MENTOR */}
          {activeTab === 'viewMentor' && (
            <>
              <div className="row g-3 mb-4">
                <div className="col-md-8">
                  <select
                    className="form-select"
                    value={selectedMentee}
                    onChange={(e) => setSelectedMentee(e.target.value)}
                  >
                    <option value="">Choose Student...</option>
                    {students.map((s) => (
                      <option key={s.studentId} value={s.studentId}>{s.name}</option>
                    ))}
                  </select>
                </div>

                <div className="col-md-4">
                  <button className="btn btn-primary w-100" onClick={handleViewMentor}>
                    Find Mentor
                  </button>
                </div>
              </div>

              {mentorInfo && (
                <div className="card bg-light">
                  <div className="card-body">
                    <p><strong>Mentor Name:</strong> {mentorInfo.mentorName}</p>
                    <p><strong>Student Name:</strong> {mentorInfo.studentName}</p>
                    <p><strong>Assigned At:</strong> {new Date(mentorInfo.assignedAt).toLocaleString()}</p>
                  </div>
                </div>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default MentorMentee;
