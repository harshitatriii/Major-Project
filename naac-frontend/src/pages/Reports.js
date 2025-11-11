import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {schoolService} from '../services/schoolService';
import {semesterService} from '../services/semesterService';
import {reportService} from '../services/reportService';
import {programService} from '../services/programService';
import { printNAAC221Report, generateReportCSV } from '../utils/printReport';
import { downloadCSV } from '../utils/helpers';

const Reports = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('221');
  
  const [schools, setSchools] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [semesters, setSemesters] = useState([]);
  
  const [selectedSchool, setSelectedSchool] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchSchools();
  }, []);

  useEffect(() => {
    if (selectedSchool) {
      fetchPrograms(selectedSchool);
      setSelectedProgram('');
      setSelectedSemester('');
      setSemesters([]);
      setReportData(null);
    }
  }, [selectedSchool]);

  useEffect(() => {
    if (selectedProgram) {
      fetchSemesters(selectedProgram);
      setSelectedSemester('');
      setReportData(null);
    }
  }, [selectedProgram]);

  const fetchSchools = async () => {
    try {
      const response = await schoolService.getAll();
      setSchools(response.data);
    } catch (error) {
      console.error('Error fetching schools:', error);
      setError('Failed to load schools');
    }
  };

  const fetchPrograms = async (schoolId) => {
    try {
      const response = await programService.getBySchool(schoolId);
      setPrograms(response.data);
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

  const handleGenerateReport = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setReportData(null);

    if (!selectedProgram || !selectedSemester) {
      setError('Please select both Program and Semester');
      return;
    }

    setLoading(true);

    try {
      const response = await reportService.getStudentTeacherRatio(selectedProgram, selectedSemester);
      setReportData(response.data);
      setSuccess('Report generated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Error generating report:', error);
      setError('Failed to generate report. Please ensure data exists for the selected criteria.');
    } finally {
      setLoading(false);
    }
  };

  const getRatioColor = (ratio) => {
    if (ratio <= 15) return 'success';
    if (ratio <= 20) return 'warning';
    return 'danger';
  };

  const getRatioStatus = (ratio) => {
    if (ratio <= 15) return 'Excellent';
    if (ratio <= 20) return 'Good';
    return 'Needs Improvement';
  };

  const handlePrintReport = () => {
    if (!reportData) return;
    
    try {
      const filters = {
        school: schools.find(s => s.schoolId === parseInt(selectedSchool))?.name || 'N/A',
        program: programs.find(p => p.programId === parseInt(selectedProgram))?.name || 'N/A',
        semester: semesters.find(s => s.semesterId === parseInt(selectedSemester))?.semesterNumber || 'N/A'
      };
      
      printNAAC221Report(reportData, filters);
      setSuccess('Print window opened! Use browser print dialog to print or save as PDF.');
      setTimeout(() => setSuccess(''), 5000);
    } catch (error) {
      setError('Failed to open print window');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleExportCSV = () => {
    if (!reportData) return;
    
    try {
      const filters = {
        school: schools.find(s => s.schoolId === parseInt(selectedSchool))?.name || 'N/A',
        program: programs.find(p => p.programId === parseInt(selectedProgram))?.name || 'N/A',
        semester: semesters.find(s => s.semesterId === parseInt(selectedSemester))?.semesterNumber || 'N/A'
      };
      
      const csvData = generateReportCSV(reportData, filters);
      const filename = `NAAC_2.2.1_Report_${new Date().toISOString().split('T')[0]}.csv`;
      downloadCSV(csvData, filename);
      
      setSuccess(`Report exported successfully as ${filename}`);
      setTimeout(() => setSuccess(''), 5000);
    } catch (error) {
      setError('Failed to export CSV');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <h2 className="fw-bold">NAAC Reports Dashboard</h2>
        <p className="text-muted">Generate and view comprehensive NAAC evaluation reports</p>
      </div>

      {/* Report Type Tabs - Updated */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === '221' ? 'active' : ''}`}
            onClick={() => setActiveTab('221')}
          >
            <i className="bi bi-bar-chart me-2"></i>
            2.2.1 Student-Teacher Ratio
          </button>
        </li>
        <li className="nav-item">
          <button 
            className="nav-link"
            onClick={() => navigate('/mentor-mentee')}
          >
            <i className="bi bi-person-lines-fill me-2"></i>
            2.2.2 Mentor-Mentee System
          </button>
        </li>
        <li className="nav-item">
          <button 
            className="nav-link"
            onClick={() => navigate('/performance')}
          >
            <i className="bi bi-graph-up-arrow me-2"></i>
            2.3.3 Student Performance
          </button>
        </li>
      </ul>

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

      {/* Filter Form */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">
            <i className="bi bi-funnel me-2"></i>
            Report Filters
          </h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleGenerateReport}>
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label fw-semibold">Select School *</label>
                <select
                  className="form-select"
                  value={selectedSchool}
                  onChange={(e) => setSelectedSchool(e.target.value)}
                  required
                >
                  <option value="">Choose School...</option>
                  {schools.map((school) => (
                    <option key={school.schoolId} value={school.schoolId}>
                      {school.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label fw-semibold">Select Program *</label>
                <select
                  className="form-select"
                  value={selectedProgram}
                  onChange={(e) => setSelectedProgram(e.target.value)}
                  disabled={!selectedSchool || programs.length === 0}
                  required
                >
                  <option value="">Choose Program...</option>
                  {programs.map((program) => (
                    <option key={program.programId} value={program.programId}>
                      {program.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label fw-semibold">Select Semester *</label>
                <select
                  className="form-select"
                  value={selectedSemester}
                  onChange={(e) => setSelectedSemester(e.target.value)}
                  disabled={!selectedProgram || semesters.length === 0}
                  required
                >
                  <option value="">Choose Semester...</option>
                  {semesters.map((semester) => (
                    <option key={semester.semesterId} value={semester.semesterId}>
                      {semester.semesterNumber}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4">
              <button 
                type="submit" 
                className="btn btn-primary btn-lg"
                disabled={loading || !selectedProgram || !selectedSemester}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Generating...
                  </>
                ) : (
                  <>
                    <i className="bi bi-file-earmark-bar-graph me-2"></i>
                    Generate Report
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Report Results */}
      {reportData && (
        <div className="row g-4">
          {/* Summary Cards */}
          <div className="col-md-4">
            <div className="card shadow-sm border-primary">
              <div className="card-body text-center">
                <div className="bg-primary bg-opacity-10 p-3 rounded-circle d-inline-block mb-3">
                  <i className="bi bi-people-fill fs-1 text-primary"></i>
                </div>
                <h6 className="text-muted mb-2">Total Students</h6>
                <h2 className="fw-bold text-primary mb-0">{reportData.students}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm border-success">
              <div className="card-body text-center">
                <div className="bg-success bg-opacity-10 p-3 rounded-circle d-inline-block mb-3">
                  <i className="bi bi-person-badge-fill fs-1 text-success"></i>
                </div>
                <h6 className="text-muted mb-2">Total Faculty</h6>
                <h2 className="fw-bold text-success mb-0">{reportData.faculty}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className={`card shadow-sm border-${getRatioColor(reportData.ratio)}`}>
              <div className="card-body text-center">
                <div className={`bg-${getRatioColor(reportData.ratio)} bg-opacity-10 p-3 rounded-circle d-inline-block mb-3`}>
                  <i className={`bi bi-bar-chart-fill fs-1 text-${getRatioColor(reportData.ratio)}`}></i>
                </div>
                <h6 className="text-muted mb-2">Student-Teacher Ratio</h6>
                <h2 className={`fw-bold text-${getRatioColor(reportData.ratio)} mb-0`}>
                  {reportData.ratio.toFixed(2)}:1
                </h2>
                <span className={`badge bg-${getRatioColor(reportData.ratio)} mt-2`}>
                  {getRatioStatus(reportData.ratio)}
                </span>
              </div>
            </div>
          </div>

          {/* Detailed Report Card */}
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-header bg-light">
                <h5 className="mb-0">
                  <i className="bi bi-clipboard-data me-2"></i>
                  NAAC Criteria 2.2.1 - Detailed Report
                </h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <h6 className="fw-bold mb-3">Report Information</h6>
                    <table className="table table-borderless">
                      <tbody>
                        <tr>
                          <td className="text-muted">School:</td>
                          <td className="fw-semibold">
                            {schools.find(s => s.schoolId === parseInt(selectedSchool))?.name}
                          </td>
                        </tr>
                        <tr>
                          <td className="text-muted">Program:</td>
                          <td className="fw-semibold">
                            {programs.find(p => p.programId === parseInt(selectedProgram))?.name}
                          </td>
                        </tr>
                        <tr>
                          <td className="text-muted">Semester:</td>
                          <td className="fw-semibold">
                            {semesters.find(s => s.semesterId === parseInt(selectedSemester))?.semesterNumber}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="col-md-6">
                    <h6 className="fw-bold mb-3">Analysis</h6>
                    <div className="alert alert-info">
                      <strong>NAAC Benchmark:</strong> Ideal ratio is 15:1 or lower
                      <br />
                      <strong>Current Status:</strong> {getRatioStatus(reportData.ratio)}
                      <br />
                      {reportData.ratio > 15 && (
                        <small>Consider hiring {Math.ceil(reportData.students / 15 - reportData.faculty)} more faculty members to meet ideal standards.</small>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <button 
                    className="btn btn-success me-2"
                    onClick={handleExportCSV}
                    title="Download report as CSV file"
                  >
                    <i className="bi bi-file-earmark-excel me-2"></i>
                    Export CSV
                  </button>
                  <button 
                    className="btn btn-outline-primary"
                    onClick={handlePrintReport}
                    title="Print report or save as PDF"
                  >
                    <i className="bi bi-printer me-2"></i>
                    Print Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!reportData && !loading && (
        <div className="card shadow-sm">
          <div className="card-body text-center py-5">
            <i className="bi bi-file-earmark-bar-graph fs-1 text-muted mb-3 d-block"></i>
            <h5 className="text-muted">No Report Generated</h5>
            <p className="text-muted">Select filters above and click "Generate Report" to view NAAC 2.2.1 data</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;