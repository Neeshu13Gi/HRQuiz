import React from 'react';
import { useNavigate } from 'react-router-dom';

const HRPanel = () => {
  const navigate = useNavigate();

  const handleSelectCount = (count) => {
    localStorage.setItem('questionCount', count);
    navigate('/hr/team');
  };

  return (
    <div className="page-container">
      <div className="app-header">
        <button className="back" onClick={() => navigate(-1)}>
          <span className="msy">arrow_back</span>
        </button>
        <div className="title">HR Panel</div>
      </div>
      
      <div style={{ marginTop: '10px' }}>
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
