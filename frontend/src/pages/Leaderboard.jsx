import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

const MEDAL_BG = ['#FFC107', '#B0BEC5', '#D7A86E'];

const Leaderboard = () => {
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const res = await API.get('/api/leaderboard');
      setEntries(res.data);
    } catch (e) {
      setEntries([
        { _id: '1', employeeName: 'Rohan S.', score: 10, totalQuestions: 10 },
        { _id: '2', employeeName: 'Aditi K.', score: 9, totalQuestions: 10 },
        { _id: '3', employeeName: 'Kabir M.', score: 8, totalQuestions: 10 },
        { _id: '4', employeeName: 'Neha P.', score: 7, totalQuestions: 10 },
        { _id: '5', employeeName: 'Sameer J.', score: 6, totalQuestions: 10 },
      ]);
    }
    setLoading(false);
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#fff', padding: '28px 24px' }}>

      {/* Title */}
      <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#1A1C1E', marginBottom: '24px' }}>Leaderboard</h2>

      {/* List */}
      <div style={{ flex: 1 }}>
        {loading ? (
          <p style={{ textAlign: 'center', color: '#9E9E9E' }}>Loading...</p>
        ) : (
          entries.map((entry, idx) => (
            <div
              key={entry._id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                paddingBottom: '16px',
                marginBottom: '16px',
                borderBottom: idx < entries.length - 1 ? '1px solid #F0F0F0' : 'none',
              }}
            >
              {/* Rank number */}
              <span style={{ fontSize: '13px', fontWeight: '700', color: '#9E9E9E', width: '18px', textAlign: 'center', flexShrink: 0 }}>
                {idx + 1}
              </span>

              {/* Medal circle */}
              <div style={{
                width: '30px', height: '30px', borderRadius: '50%',
                background: idx < 3 ? MEDAL_BG[idx] : '#EEEEEE',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '11px', fontWeight: '700',
                color: idx < 3 ? '#fff' : '#9E9E9E',
                flexShrink: 0,
              }}>
                {idx < 3 ? idx + 1 : entry.employeeName.charAt(0)}
              </div>

              {/* Name */}
              <span style={{ flex: 1, fontSize: '13px', fontWeight: '500', color: '#1A1C1E' }}>
                {entry.employeeName}
              </span>

              {/* Score */}
              <span style={{ fontSize: '13px', fontWeight: '700', color: '#1565C0' }}>
                {entry.score}/{entry.totalQuestions}
              </span>
            </div>
          ))
        )}
      </div>

      {/* Bottom Buttons: Home (outline) + Play (solid) */}
      <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
        <button
          onClick={() => navigate('/')}
          style={{ flex: 1, padding: '14px', background: '#fff', border: '1.5px solid #90CAF9', borderRadius: '10px', color: '#1565C0', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}
        >
          Home
        </button>
        <button
          onClick={() => navigate('/login')}
          style={{ flex: 1, padding: '14px', background: '#1565C0', border: 'none', borderRadius: '10px', color: '#fff', fontSize: '14px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 14px rgba(21,101,192,0.3)' }}
        >
          Play
        </button>
      </div>

    </div>
  );
};

export default Leaderboard;
