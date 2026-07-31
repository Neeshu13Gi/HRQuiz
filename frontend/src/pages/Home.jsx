import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#fff',
      padding: '40px 30px',
      gap: '0',
    }}>
      {/* Logo Box */}
      <div style={{
        width: '80px',
        height: '80px',
        borderRadius: '22px',
        background: '#1565C0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '22px',
        boxShadow: '0 8px 24px rgba(21,101,192,0.25)',
      }}>
        <span className="msy" style={{ color: '#fff', fontSize: '42px' }}>quiz</span>
      </div>

      {/* Title */}
      <h1 style={{
        fontSize: '22px',
        fontWeight: '800',
        color: '#1A1C1E',
        marginBottom: '50px',
        textAlign: 'center',
      }}>
        Quiz Challenge
      </h1>

      {/* HR Panel Button */}
      <button
        onClick={() => navigate('/hr/panel')}
        style={{
          width: '220px',
          padding: '14px',
          background: '#fff',
          border: '1.5px solid #90CAF9',
          borderRadius: '50px',
          fontSize: '14px',
          fontWeight: '600',
          color: '#1565C0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          cursor: 'pointer',
          marginBottom: '16px',
        }}
      >
        <span className="msy" style={{ fontSize: '18px', color: '#1565C0' }}>badge</span>
        HR Panel
      </button>

      {/* Start Game Button */}
      <button
        onClick={() => navigate('/login')}
        style={{
          width: '220px',
          padding: '14px',
          background: '#1565C0',
          border: 'none',
          borderRadius: '50px',
          fontSize: '14px',
          fontWeight: '700',
          color: '#fff',
          cursor: 'pointer',
          boxShadow: '0 6px 20px rgba(21,101,192,0.35)',
          letterSpacing: '0.3px',
        }}
      >
        Start Game
      </button>
    </div>
  );
};

export default Home;
