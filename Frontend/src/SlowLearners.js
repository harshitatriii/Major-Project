import React, { useState } from 'react';

function SlowLearners() {
  // Mock student data
  const [students] = useState([
    { id: 1, name: 'Alice', marks: 45 },
    { id: 2, name: 'Bob', marks: 78 },
    { id: 3, name: 'Charlie', marks: 55 },
    { id: 4, name: 'Diana', marks: 30 },
    { id: 5, name: 'Eve', marks: 88 },
  ]);

  // Criteria for classification
  const slowThreshold = 50;
  const advancedThreshold = 75;

  const slowLearners = students.filter(s => s.marks < slowThreshold);
  const advancedLearners = students.filter(s => s.marks >= advancedThreshold);

  return (
    <div className="container mt-4">
      <h2>Slow and Advanced Learner Identification</h2>
      <hr />

      <h4>Slow Learners (Marks below {slowThreshold})</h4>
      {slowLearners.length > 0 ? (
        <ul>
          {slowLearners.map(student => (
            <li key={student.id}>
              {student.name} – {student.marks} marks
            </li>
          ))}
        </ul>
      ) : (
        <p>No slow learners found.</p>
      )}

      <h4>Advanced Learners (Marks {advancedThreshold} and above)</h4>
      {advancedLearners.length > 0 ? (
        <ul>
          {advancedLearners.map(student => (
            <li key={student.id}>
              {student.name} – {student.marks} marks
            </li>
          ))}
        </ul>
      ) : (
        <p>No advanced learners found.</p>
      )}
    </div>
  );
}

export default SlowLearners;
