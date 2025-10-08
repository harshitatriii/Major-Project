import React from 'react';

function Dashboard() {
  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">NAAC Criteria Automation Dashboard</h1>
      <div className="alert alert-info text-center" role="alert">
        Welcome to the NAAC Dashboard! Use the sections below to manage learners, faculty, mentorship, and attainment mapping.
      </div>

      <div className="row">
        {/* Slow and Advanced Learner Identification */}
        <div className="col-md-6 mb-3">
          <div className="card border-primary h-100">
            <div className="card-header bg-primary text-white">
              Slow & Advanced Learner Identification
            </div>
            <div className="card-body">
              <p className="card-text">
                Classify students based on academic performance and suggest remedial or advanced learning programs.
              </p>
              <button className="btn btn-primary">View Learners</button>
            </div>
          </div>
        </div>

        {/* Faculty and Student Management */}
        <div className="col-md-6 mb-3">
          <div className="card border-success h-100">
            <div className="card-header bg-success text-white">
              Faculty & Student Management
            </div>
            <div className="card-body">
              <p className="card-text">
                Maintain structured records of academic profiles, performance, and participation.
              </p>
              <button className="btn btn-success">Manage Records</button>
            </div>
          </div>
        </div>

        {/* Mentor–Mentee System */}
        <div className="col-md-6 mb-3">
          <div className="card border-warning h-100">
            <div className="card-header bg-warning text-dark">
              Mentor–Mentee System
            </div>
            <div className="card-body">
              <p className="card-text">
                Track mentorship activities, counseling sessions, and monitor student progress effectively.
              </p>
              <button className="btn btn-warning">Track Mentorship</button>
            </div>
          </div>
        </div>

        {/* CO–PO Mapping and Attainment Calculation */}
        <div className="col-md-6 mb-3">
          <div className="card border-info h-100">
            <div className="card-header bg-info text-white">
              CO–PO Mapping & Attainment
            </div>
            <div className="card-body">
              <p className="card-text">
                Automate the mapping of Course Outcomes (COs) to Program Outcomes (POs) and generate attainment reports.
              </p>
              <button className="btn btn-info">View Mapping</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
