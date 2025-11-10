import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Schools from './pages/Schools';
import Programs from './pages/Programs';
import Semesters from './pages/Semesters';
import Faculties from './pages/Faculties';
import Students from './pages/Students';
import Assignments from './pages/Assignments';
import Reports from './pages/Reports';
import MentorMentee from './pages/MentorMentee';
import StudentPerformance from './pages/StudentPerformance';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/schools" element={<Schools />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/semesters" element={<Semesters />} />
          <Route path="/faculties" element={<Faculties />} />
          <Route path="/students" element={<Students />} />
          <Route path="/assignments" element={<Assignments />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/mentor-mentee" element={<MentorMentee />} />
          <Route path="/performance" element={<StudentPerformance />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;