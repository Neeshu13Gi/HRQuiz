import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

const QuizComplete = () => {
  const navigate = useNavigate();
  const saved = useRef(false);
  const result = JSON.parse(localStorage.getItem('quizResult') || '{"score":8,"wrongCount":2,"time":"4m 12s","total":10}');
  const player = JSON.parse(localStorage.getItem('currentPlayer') || '{"name":"Player","empId":"000"}');

  useEffect(() => {
    if (!saved.current) {
      saved.current = true;
      saveResult();
    }
  }, []);

  const saveResult = async () => {
    try {
      await API.post('/api/results', {
        employeeName: player.name,
        employeeId: player.empId,
        score: result.score,
        totalQuestions: result.total,
        timeTaken: result.time,
      });
    } catch (e) {
      console.error('Could not save result', e);
    }
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#fff', alignItems: 'center', padding: '40px 24px 30px' }}>

      {/* Trophy */}
      <div style={{ width: '74px', height: '74px', borderRadius: '50%', background: 'linear-gradient(135deg, #FFD54F, #FF8F00)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(255,143,0,0.35)', marginBottom: '18px' }}>
        <span className="msy" style={{ fontSize: '42px', color: '#fff' }}>emoji_events</span>
      </div>

      <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#1A1C1E', marginBottom: '6px' }}>Congratulations!</h2>
      <p style={{ fontSize: '13px', color: '#9E9E9E', marginBottom: '30px' }}>You completed the quiz</p>

      {/* Correct / Wrong */}
      <div style={{ display: 'flex', gap: '14px', width: '100%', marginBottom: '14px' }}>
        <div style={{ flex: 1, background: '#E8F5E9', borderRadius: '14px', padding: '16px', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: '800', color: '#2E7D32' }}>{result.score}</div>
          <div style={{ fontSize: '12px', color: '#9E9E9E', marginTop: '4px' }}>Correct</div>
        </div>
        <div style={{ flex: 1, background: '#FFEBEE', borderRadius: '14px', padding: '16px', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: '800', color: '#D32F2F' }}>{result.wrongCount}</div>
          <div style={{ fontSize: '12px', color: '#9E9E9E', marginTop: '4px' }}>Wrong</div>
        </div>
      </div>

      {/* Time */}
      <div style={{ width: '100%', background: '#E3F2FD', borderRadius: '14px', padding: '16px', textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ fontSize: '22px', fontWeight: '800', color: '#0D47A1' }}>{result.time}</div>
        <div style={{ fontSize: '12px', color: '#9E9E9E', marginTop: '4px' }}>Total time</div>
      </div>

      {/* View Leaderboard */}
      <button
        onClick={() => navigate('/leaderboard')}
        style={{ width: '100%', padding: '15px', background: '#1565C0', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '15px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 6px 20px rgba(21,101,192,0.3)' }}
      >
        View leaderboard
      </button>
    </div>
  );
};

export default QuizComplete;
