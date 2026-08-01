import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import { playSuccess, playError, speakText, playClick } from '../audio';

const QuizComplete = () => {
  const navigate = useNavigate();
  const saved = useRef(false);
  const result = JSON.parse(localStorage.getItem('quizResult') || '{"score":8,"wrongCount":2,"time":"4m 12s","total":10}');
  const player = JSON.parse(localStorage.getItem('currentPlayer') || '{"name":"Player","empId":"000"}');

  useEffect(() => {
    if (!saved.current) {
      saved.current = true;
      saveResult();
      
      // Play sounds based on score
      if (result.score > 0) {
        playSuccess();
      } else {
        playError();
      }
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
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#ffffff', alignItems: 'center', padding: '40px 24px 30px', position: 'relative', overflow: 'hidden' }}>
      
      <style>{`
        @keyframes popIn {
          0% { transform: scale(0.3); opacity: 0; }
          60% { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes fadeInUp {
          0% { transform: translateY(30px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes confettiFall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translateY(10px) rotate(180deg); opacity: 1; }
        }
      `}</style>

      {/* Dynamic Header based on score */}
      {result.score > 0 ? (
        <>
          {/* Background Confetti Elements */}
          <div style={{ position: 'absolute', top: '30px', left: '50%', transform: 'translateX(-50%)', width: '220px', height: '140px', pointerEvents: 'none' }}>
            <div style={{ position: 'absolute', top: '10px', left: '20px', width: '6px', height: '6px', background: '#FFC107', borderRadius: '50%', animation: 'confettiFall 0.8s ease-out 0.1s both' }}></div>
            <div style={{ position: 'absolute', top: '45px', left: '-10px', width: '8px', height: '8px', background: '#4F46E5', borderRadius: '50%', animation: 'confettiFall 0.8s ease-out 0.2s both' }}></div>
            <div style={{ position: 'absolute', top: '0px', right: '40px', width: '6px', height: '6px', background: '#00E676', borderRadius: '50%', animation: 'confettiFall 0.8s ease-out 0.15s both' }}></div>
            <div style={{ position: 'absolute', top: '55px', right: '-5px', width: '8px', height: '8px', background: '#FF4081', borderRadius: '50%', animation: 'confettiFall 0.8s ease-out 0.25s both' }}></div>
            <div style={{ position: 'absolute', top: '-5px', left: '70px', width: '12px', height: '4px', background: '#3F51B5', borderRadius: '2px', animation: 'confettiFall 0.8s ease-out 0.1s both' }}></div>
            <div style={{ position: 'absolute', top: '80px', right: '20px', width: '12px', height: '4px', background: '#3F51B5', borderRadius: '2px', animation: 'confettiFall 0.8s ease-out 0.3s both' }}></div>
            <div style={{ position: 'absolute', top: '100px', left: '20px', width: '6px', height: '6px', background: '#FFC107', borderRadius: '50%', animation: 'confettiFall 0.8s ease-out 0.35s both' }}></div>
          </div>

          {/* Trophy */}
          <div style={{ width: '96px', height: '96px', borderRadius: '50%', background: 'linear-gradient(135deg, #FFD54F, #FF9800)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 12px 32px rgba(255,152,0,0.3)', marginBottom: '24px', zIndex: 1, animation: 'popIn 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275) both' }}>
            <span className="msy" style={{ fontSize: '52px', color: '#fff' }}>emoji_events</span>
          </div>

          <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#111118', marginBottom: '8px', zIndex: 1, animation: 'fadeInUp 0.6s ease-out 0.2s both' }}>Congratulations!</h2>
        </>
      ) : (
        <>
          {/* Sad Face */}
          <div style={{ width: '96px', height: '96px', borderRadius: '50%', background: 'linear-gradient(135deg, #FF8A65, #E64A19)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 12px 32px rgba(230,74,25,0.3)', marginBottom: '24px', zIndex: 1, animation: 'popIn 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275) both' }}>
            <span className="msy" style={{ fontSize: '52px', color: '#fff' }}>sentiment_dissatisfied</span>
          </div>

          <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#111118', marginBottom: '8px', zIndex: 1, animation: 'fadeInUp 0.6s ease-out 0.2s both' }}>Oops!</h2>
        </>
      )}
      
      {/* Subheading with lines */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '6px', zIndex: 1, animation: 'fadeInUp 0.6s ease-out 0.3s both' }}>
        <div style={{ height: '1.5px', width: '40px', background: '#EAEAF0' }}></div>
        <p style={{ fontSize: '15px', color: '#6E6E7A', fontWeight: '500' }}>You completed the quiz</p>
        <div style={{ height: '1.5px', width: '40px', background: '#EAEAF0' }}></div>
      </div>
      <span className="msy" style={{ fontSize: '18px', color: '#4F46E5', marginBottom: '32px', animation: 'fadeInUp 0.6s ease-out 0.3s both' }}>star</span>

      {/* Correct / Wrong Boxes */}
      <div style={{ display: 'flex', gap: '14px', width: '100%', marginBottom: '16px', animation: 'fadeInUp 0.6s ease-out 0.4s both' }}>
        <div style={{ flex: 1, background: '#F1FAEB', border: '1.5px solid #E2F3D9', borderRadius: '16px', padding: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(46,125,50,0.08)' }}>
            <span className="msy" style={{ color: '#2E7D32', fontSize: '26px', fontWeight: 'bold' }}>check</span>
          </div>
          <div>
            <div style={{ fontSize: '26px', fontWeight: '800', color: '#2E7D32', lineHeight: 1 }}>{result.score}</div>
            <div style={{ fontSize: '13px', color: '#424242', marginTop: '6px', fontWeight: '600' }}>Correct</div>
          </div>
        </div>
        
        <div style={{ flex: 1, background: '#FFF1F1', border: '1.5px solid #FCE4E4', borderRadius: '16px', padding: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(211,47,47,0.08)' }}>
            <span className="msy" style={{ color: '#D32F2F', fontSize: '26px', fontWeight: 'bold' }}>close</span>
          </div>
          <div>
            <div style={{ fontSize: '26px', fontWeight: '800', color: '#D32F2F', lineHeight: 1 }}>{result.wrongCount}</div>
            <div style={{ fontSize: '13px', color: '#424242', marginTop: '6px', fontWeight: '600' }}>Wrong</div>
          </div>
        </div>
      </div>

      {/* Time Taken Box */}
      <div style={{ width: '100%', background: '#F5F5FF', border: '1.5px solid #EDEDFC', borderRadius: '16px', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '32px', animation: 'fadeInUp 0.6s ease-out 0.5s both' }}>
         <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(79,70,229,0.08)' }}>
            <span className="msy" style={{ color: '#4F46E5', fontSize: '32px' }}>timer</span>
          </div>
          <div>
            <div style={{ fontSize: '28px', fontWeight: '800', color: '#4F46E5', lineHeight: 1 }}>{result.time}</div>
            <div style={{ fontSize: '14px', color: '#6E6E7A', marginTop: '8px', fontWeight: '500' }}>Total time taken</div>
          </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', gap: '12px', justifyContent: 'center', width: '100%', marginBottom: '20px', animation: 'fadeInUp 0.6s ease-out 0.6s both' }}>
        {/* View Leaderboard Button */}
        <button
          onClick={() => { playClick(); navigate('/leaderboard'); }}
          style={{ flex: 1, padding: '14px 10px', background: 'linear-gradient(90deg, #4F46E5, #3730A3)', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '14px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', boxShadow: '0 6px 20px rgba(79,70,229,0.35)', transition: 'transform 0.2s' }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <span className="msy" style={{ fontSize: '18px' }}>leaderboard</span>
          <span>Leaderboard</span>
        </button>

        {/* Play Button */}
        <button
          onClick={() => { playClick(); navigate('/'); }}
          style={{ flex: 1, padding: '14px 10px', background: '#F0F0F5', border: 'none', borderRadius: '12px', color: '#4F46E5', fontSize: '14px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', transition: 'transform 0.2s' }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <span className="msy" style={{ fontSize: '18px' }}>refresh</span>
          <span>Play</span>
        </button>
      </div>

    </div>
  );
};

export default QuizComplete;
