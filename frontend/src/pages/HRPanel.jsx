import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';

const HRPanel = () => {
  const navigate = useNavigate();

  const handleSelectCount = (count) => {
    localStorage.setItem('questionCount', count);
    navigate('/hr/team');
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--card)' }}>
      <PageHeader title="Customize Quiz" />

      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '0' }}>
        <button
          className="wide-btn animate-popup" style={{ animationDelay: '0.1s', opacity: 0 }}
          onClick={() => handleSelectCount(5)}
        >
          <span className="msy">looks_5</span>
          <span>5 Questions</span>
        </button>

        <button
          className="wide-btn animate-popup" style={{ animationDelay: '0.2s', opacity: 0 }}
          onClick={() => handleSelectCount(10)}
        >
          <span className="msy">filter_5</span>
          <span>10 Questions</span>
        </button>

        <button
          className="wide-btn animate-popup" style={{ animationDelay: '0.3s', opacity: 0 }}
          onClick={() => handleSelectCount(15)}
        >
          <span className="msy">filter_9_plus</span>
          <span>15 Questions</span>
        </button>
      </div>
    </div>
  );
};

export default HRPanel;
