import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import { playClick } from '../audio';

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
        { _id: '1', employeeName: 'Rohan S.',  score: 10, totalQuestions: 10 },
        { _id: '2', employeeName: 'Aditi K.',  score: 9,  totalQuestions: 10 },
        { _id: '3', employeeName: 'Kabir M.',  score: 8,  totalQuestions: 10 },
        { _id: '4', employeeName: 'Neha P.',   score: 7,  totalQuestions: 10 },
        { _id: '5', employeeName: 'Sameer J.', score: 6,  totalQuestions: 10 },
      ]);
    }
    setLoading(false);
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--card)', padding: '28px 24px' }}>

      {/* Title */}
      <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text)', marginBottom: '24px' }}>Leaderboard</h2>

      {/* List */}
      <div style={{ flex: 1 }}>
        {loading ? (
          <p style={{ textAlign: 'center', color: 'var(--label)' }}>Loading...</p>
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
                borderBottom: idx < entries.length - 1 ? '1px solid var(--border)' : 'none',
              }}
            >
              {/* Rank number */}
              <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--label)', width: '18px', textAlign: 'center', flexShrink: 0 }}>
                {idx + 1}
              </span>

              {/* Medal circle */}
              <div style={{
                width: '30px', height: '30px', borderRadius: '50%',
                background: idx === 0 ? 'var(--gold)' : idx === 1 ? 'var(--silver)' : idx === 2 ? 'var(--bronze)' : 'var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '11px', fontWeight: '700',
                color: idx < 3 ? '#fff' : 'var(--sub)',
                flexShrink: 0,
              }}>
                {idx < 3 ? idx + 1 : entry.employeeName.charAt(0)}
              </div>

              {/* Name */}
              <span style={{ flex: 1, fontSize: '13px', fontWeight: '500', color: 'var(--text)' }}>
                {entry.employeeName}
              </span>

              {/* Score */}
              <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--blue)' }}>
                {entry.score}/{entry.totalQuestions}
              </span>
            </div>
          ))
        )}
      </div>

      {/* Bottom Buttons: Home (outline) + Play (solid) */}
      <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
        <button
          onClick={() => { playClick(); navigate('/'); }}
          style={{ flex: 1, padding: '14px', background: 'var(--input-bg)', border: '1.5px solid var(--blue-mid)', borderRadius: '10px', color: 'var(--blue)', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}
        >
          Home
        </button>
        <button
          onClick={() => { playClick(); navigate('/login'); }}
          style={{ flex: 1, padding: '14px', background: 'var(--blue)', border: 'none', borderRadius: '10px', color: '#fff', fontSize: '14px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 14px rgba(21,101,192,0.3)' }}
        >
          Play
        </button>
      </div>

    </div>
  );
};

export default Leaderboard;
