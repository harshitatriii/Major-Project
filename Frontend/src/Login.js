import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [school, setSchool] = useState('');
  const [course, setCourse] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Basic validation
    if (email && password && school && course) {
      // Save details in session/local storage if needed
      console.log({ email, password, school, course });
      navigate('/'); // Redirect to Dashboard after login
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">College NAAC Portal Login</h2>
      <form onSubmit={handleLogin} className="w-50 mx-auto">
        <div className="mb-3">
          <label className="form-label">Email ID</label>
          <input 
            type="email" 
            className="form-control" 
            placeholder="Enter your college email ID"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input 
            type="password" 
            className="form-control" 
            placeholder="Enter your password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <div className="mb-3">
          <label className="form-label">School Name</label>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Enter your school name"
            value={school} 
            onChange={(e) => setSchool(e.target.value)} 
            required 
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Course Name</label>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Enter your course name"
            value={course} 
            onChange={(e) => setCourse(e.target.value)} 
            required 
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
