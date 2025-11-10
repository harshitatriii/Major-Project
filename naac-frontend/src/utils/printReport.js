// utils/printReport.js

/**
 * Print NAAC 2.2.1 Report
 */
export const printNAAC221Report = (reportData, filters) => {
  const printWindow = window.open('', '_blank');
  const { students, faculty, ratio } = reportData;
  const { school, program, semester } = filters;
  
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>NAAC 2.2.1 Report - Student-Teacher Ratio</title>
      <style>
        @media print {
          @page {
            margin: 2cm;
            size: A4;
          }
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          .no-print {
            display: none !important;
          }
        }
        
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        
        .header {
          text-align: center;
          border-bottom: 3px solid #0d6efd;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        
        .header h1 {
          color: #0d6efd;
          margin: 0 0 10px 0;
          font-size: 24px;
        }
        
        .header h2 {
          color: #666;
          margin: 0;
          font-size: 18px;
          font-weight: normal;
        }
        
        .info-section {
          background: #f8f9fa;
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 20px;
        }
        
        .info-section h3 {
          color: #0d6efd;
          margin-top: 0;
          font-size: 16px;
        }
        
        .info-row {
          display: flex;
          margin: 8px 0;
        }
        
        .info-label {
          font-weight: bold;
          width: 150px;
          color: #555;
        }
        
        .info-value {
          flex: 1;
          color: #333;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
          margin: 30px 0;
        }
        
        .stat-card {
          border: 2px solid #e9ecef;
          border-radius: 8px;
          padding: 20px;
          text-align: center;
        }
        
        .stat-card.excellent {
          border-color: #198754;
          background: #d1e7dd;
        }
        
        .stat-card.good {
          border-color: #ffc107;
          background: #fff3cd;
        }
        
        .stat-card.needs-improvement {
          border-color: #dc3545;
          background: #f8d7da;
        }
        
        .stat-label {
          font-size: 14px;
          color: #666;
          margin-bottom: 5px;
        }
        
        .stat-value {
          font-size: 32px;
          font-weight: bold;
          color: #333;
        }
        
        .stat-status {
          margin-top: 10px;
          padding: 5px 10px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: bold;
        }
        
        .status-excellent {
          background: #198754;
          color: white;
        }
        
        .status-good {
          background: #ffc107;
          color: #000;
        }
        
        .status-needs-improvement {
          background: #dc3545;
          color: white;
        }
        
        .analysis {
          background: #e7f3ff;
          border-left: 4px solid #0d6efd;
          padding: 15px;
          margin: 20px 0;
        }
        
        .analysis h4 {
          color: #0d6efd;
          margin-top: 0;
        }
        
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 2px solid #e9ecef;
          text-align: center;
          font-size: 12px;
          color: #666;
        }
        
        .no-print {
          text-align: center;
          margin: 20px 0;
        }
        
        @media print {
          .no-print {
            display: none;
          }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>NAAC Evaluation Report</h1>
        <h2>Criteria 2.2.1 - Student-Teacher Ratio</h2>
      </div>
      
      <div class="info-section">
        <h3>Report Information</h3>
        <div class="info-row">
          <div class="info-label">School:</div>
          <div class="info-value">${school || 'N/A'}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Program:</div>
          <div class="info-value">${program || 'N/A'}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Semester:</div>
          <div class="info-value">${semester || 'N/A'}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Report Date:</div>
          <div class="info-value">${new Date().toLocaleDateString('en-IN', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</div>
        </div>
      </div>
      
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-label">Total Students</div>
          <div class="stat-value">${students}</div>
        </div>
        
        <div class="stat-card">
          <div class="stat-label">Total Faculty</div>
          <div class="stat-value">${faculty}</div>
        </div>
        
        <div class="stat-card ${getRatioClass(ratio)}">
          <div class="stat-label">Student-Teacher Ratio</div>
          <div class="stat-value">${ratio.toFixed(2)}:1</div>
          <div class="stat-status ${getStatusClass(ratio)}">
            ${getRatioStatus(ratio)}
          </div>
        </div>
      </div>
      
      <div class="analysis">
        <h4>Analysis & NAAC Compliance</h4>
        <p><strong>NAAC Benchmark:</strong> The ideal student-teacher ratio is 1:15 or lower for optimal learning outcomes.</p>
        <p><strong>Current Status:</strong> ${getRatioStatus(ratio)}</p>
        ${ratio > 15 ? `
          <p><strong>Recommendation:</strong> Consider hiring approximately ${Math.ceil(students / 15 - faculty)} more faculty members to meet the ideal NAAC standards.</p>
        ` : `
          <p><strong>Status:</strong> The current ratio meets NAAC standards and indicates adequate faculty strength.</p>
        `}
      </div>
      
      <div class="info-section">
        <h3>Calculation Details</h3>
        <p>Student-Teacher Ratio = Total Students ÷ Total Faculty</p>
        <p>${students} students ÷ ${faculty} faculty = ${ratio.toFixed(2)}:1</p>
      </div>
      
      <div class="footer">
        <p><strong>NAAC Evaluation System</strong></p>
        <p>This is a computer-generated report. Report ID: NAAC-221-${Date.now()}</p>
        <p>Generated on: ${new Date().toLocaleString('en-IN')}</p>
      </div>
      
      <div class="no-print">
        <button onclick="window.print()" style="
          background: #0d6efd;
          color: white;
          border: none;
          padding: 12px 30px;
          font-size: 16px;
          border-radius: 5px;
          cursor: pointer;
          margin: 10px;
        ">
          🖨️ Print Report
        </button>
        <button onclick="window.close()" style="
          background: #6c757d;
          color: white;
          border: none;
          padding: 12px 30px;
          font-size: 16px;
          border-radius: 5px;
          cursor: pointer;
          margin: 10px;
        ">
          ✕ Close
        </button>
      </div>
    </body>
    </html>
  `;
  
  printWindow.document.write(htmlContent);
  printWindow.document.close();
};

/**
 * Helper functions
 */
const getRatioStatus = (ratio) => {
  if (ratio <= 15) return 'Excellent';
  if (ratio <= 20) return 'Good';
  return 'Needs Improvement';
};

const getRatioClass = (ratio) => {
  if (ratio <= 15) return 'excellent';
  if (ratio <= 20) return 'good';
  return 'needs-improvement';
};

const getStatusClass = (ratio) => {
  if (ratio <= 15) return 'status-excellent';
  if (ratio <= 20) return 'status-good';
  return 'status-needs-improvement';
};

/**
 * Export report as PDF (using browser's print to PDF)
 */
export const exportReportAsPDF = (reportData, filters) => {
  printNAAC221Report(reportData, filters);
  // User can then use browser's "Print to PDF" option
};

/**
 * Generate report data for CSV export
 */
export const generateReportCSV = (reportData, filters) => {
  const data = [{
    'Report Type': 'NAAC 2.2.1 - Student-Teacher Ratio',
    'School': filters.school || 'N/A',
    'Program': filters.program || 'N/A',
    'Semester': filters.semester || 'N/A',
    'Total Students': reportData.students,
    'Total Faculty': reportData.faculty,
    'Ratio': reportData.ratio.toFixed(2),
    'Status': getRatioStatus(reportData.ratio),
    'Report Date': new Date().toLocaleDateString('en-IN'),
    'Report Time': new Date().toLocaleTimeString('en-IN')
  }];
  
  return data;
};

/**
 * Email report (placeholder for future implementation)
 */
export const emailReport = async (reportData, filters, recipientEmail) => {
  // This would integrate with your backend email service
  console.log('Email report to:', recipientEmail);
  console.log('Report data:', reportData);
  
  // Future implementation:
  // await api.post('/api/reports/email', {
  //   reportData,
  //   filters,
  //   recipient: recipientEmail
  // });
  
  return {
    success: true,
    message: 'Report will be sent to ' + recipientEmail
  };
};