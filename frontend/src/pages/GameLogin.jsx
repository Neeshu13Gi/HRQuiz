import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GameLogin = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [empId, setEmpId] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (name && empId) {
      localStorage.setItem('currentPlayer', JSON.stringify({ name, empId }));
      navigate('/quiz');
    }
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#fff' }}>

      {/* ── Header ── */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '24px 20px 0' }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            width: '32px', height: '32px', borderRadius: '50%',
            background: '#E3F2FD', border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', flexShrink: 0,
          }}
        >
          <span className="msy" style={{ fontSize: '16px', color: '#1565C0' }}>arrow_back</span>
        </button>
        {/* Title centered in remaining space */}
        <h1 style={{
          flex: 1, textAlign: 'center',
          fontSize: '18px', fontWeight: '700',
          color: '#1A1C1E', marginRight: '32px',
        }}>
          Start Game
        </h1>
      </div>

      {/* ── Form ── */}
      <form onSubmit={handleLogin} style={{ padding: '60px 28px 30px', display: 'flex', flexDirection: 'column' }}>

        {/* Employee Name */}
        <label style={{ fontSize: '13px', color: '#9E9E9E', marginBottom: '8px' }}>
          Employee Name
        </label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Enter Name.."
          required
          style={{
            width: '100%', padding: '14px 20px',
            border: '1.5px solid #E4E7EC', borderRadius: '50px',
            fontSize: '14px', color: '#1A1C1E', outline: 'none',
            background: '#fff', marginBottom: '24px',
          }}
        />

        {/* Employee ID */}
        <label style={{ fontSize: '13px', color: '#9E9E9E', marginBottom: '8px' }}>
          Employee ID
        </label>
        <input
          type="text"
          value={empId}
          onChange={e => setEmpId(e.target.value)}
          placeholder="092"
          required
          style={{
            width: '100%', padding: '14px 20px',
            border: '1.5px solid #E4E7EC', borderRadius: '50px',
            fontSize: '14px', color: '#1A1C1E', outline: 'none',
            background: '#fff', marginBottom: '40px',
          }}
        />

        {/* Login Button — centered, pill shape */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            type="submit"
            style={{
              width: '200px', padding: '14px',
              background: '#1565C0', border: 'none',
              borderRadius: '50px', color: '#fff',
              fontSize: '15px', fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(21,101,192,0.35)',
              letterSpacing: '0.3px',
            }}
          >
            Login
          </button>
        </div>

      </form>
    </div>
  );
};

export default GameLogin;
