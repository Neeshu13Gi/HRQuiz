import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import { playClick, playTick } from '../audio';


const TIMER_SECONDS = 10;

const QuizScreen = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [showTimeUp, setShowTimeUp] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Use refs for score to avoid async state issues
  const scoreRef = useRef(0);
  const wrongRef = useRef(0);
  const startTimeRef = useRef(null);
  const timerRef = useRef(null);
  const finishedRef = useRef(false);

  const player = JSON.parse(localStorage.getItem('currentPlayer') || '{"name":"Player","empId":"000"}');
  const count = parseInt(localStorage.getItem('questionCount') || '10');

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await API.get(`/api/questions/all`);
      if (res.data && res.data.length > 0) {
        // Shuffle and pick up to the selected count
        const shuffled = [...res.data].sort(() => Math.random() - 0.5);
        setQuestions(shuffled.slice(0, Math.min(count, shuffled.length)));
        startTimeRef.current = Date.now();
      } else {
        setError('No Questions');
      }
    } catch (err) {
      setError('..No Questions..');
    }
    setLoading(false);
  };

  // Timer countdown
  useEffect(() => {
    if (loading || showTimeUp || questions.length === 0) return;
    if (timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(t => t - 1);
        if (timeLeft <= 5) playTick();
      }, 1000);
      return () => clearTimeout(timerRef.current);
    } else {
      wrongRef.current += 1;
      setShowTimeUp(true);
    }
  }, [timeLeft, loading, showTimeUp, questions]);

  const handleAnswer = (selectedOpt) => {
    playClick();
    clearTimeout(timerRef.current);
    if (selectedOpt === questions[currentIdx].correctAnswer) {
      scoreRef.current += 1;
    } else {
      wrongRef.current += 1;
    }
    goNext();
  };

  const goNext = () => {
    setShowTimeUp(false);
    const nextIdx = currentIdx + 1;
    if (nextIdx < questions.length) {
      setCurrentIdx(nextIdx);
      setTimeLeft(TIMER_SECONDS);
    } else {
      if (finishedRef.current) return;
      finishedRef.current = true;
      
      // Quiz finished — save result to localStorage only
      // (DB save happens once in QuizComplete via useEffect with ref guard)
      const elapsed = Math.round((Date.now() - startTimeRef.current) / 1000);
      const mins = Math.floor(elapsed / 60);
      const secs = elapsed % 60;
      const result = {
        score: scoreRef.current,
        wrongCount: wrongRef.current,
        time: `${mins}m ${secs}s`,
        total: questions.length,
        employeeName: player.name,
        employeeId: player.empId,
      };
      localStorage.setItem('quizResult', JSON.stringify(result));

      navigate('/complete');
    }
  };

  const initials = player.name.substring(0, 2).toUpperCase();

  // Loading state
  if (loading) {
    return (
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '12px', background: 'var(--card)' }}>
        <span className="msy" style={{ fontSize: '40px', color: 'var(--blue-mid)' }}>hourglass_top</span>
        <p style={{ color: 'var(--label)', fontSize: '14px' }}>Loading questions...</p>
      </div>
    );
  }

  // Error state
  if (error || questions.length === 0) {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px', textAlign: 'center', background: 'var(--card)' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,143,0,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
          <span className="msy" style={{ fontSize: '42px', color: '#FF8F00' }}>info</span>
        </div>
        <h3 style={{ fontSize: '17px', fontWeight: '700', color: 'var(--text)', marginBottom: '10px' }}>
          
        </h3>
        <p style={{ fontSize: '13px', color: 'var(--label)', lineHeight: '1.6', marginBottom: '32px', whiteSpace: 'pre-line' }}>
          {error || 'HR ne abhi koi question add nahi kiya hai.'}
        </p>
        <button
          onClick={() => { playClick(); navigate('/'); }}
          style={{ padding: '13px 32px', background: 'var(--blue)', border: 'none', borderRadius: '12px', color: '#fff', fontWeight: '700', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(21,101,192,0.3)' }}
        >
          Home
        </button>
      </div>
    );
  }

  const currentQ = questions[currentIdx];
  const progress = ((currentIdx + 1) / questions.length) * 100;
  const circumference = 2 * Math.PI * 28;
  const dashOffset = circumference * (1 - timeLeft / TIMER_SECONDS);
  const timerColor = timeLeft <= 5 ? '#D32F2F' : '#388E3C'; // Red if <= 5, else Green

  // ── Quiz Playing Screen ──
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: showTimeUp ? 'var(--sub)' : 'var(--card)', position: 'relative' }}>
      {!showTimeUp ? (
        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
          {/* Top Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--blue-light)', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '700' }}>
              {initials}
            </div>
            <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text)' }}>{player.name}</span>
            <span className="msy" style={{ fontSize: '20px', color: 'var(--sub)' }}>more_horiz</span>
          </div>

          {/* Circular Timer */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '6px' }}>
            <svg width="72" height="72">
              <circle cx="36" cy="36" r="28" fill="none" stroke="#E8F5E9" strokeWidth="5" />
              <circle cx="36" cy="36" r="28" fill="none" stroke={timerColor} strokeWidth="5"
                strokeDasharray={circumference} strokeDashoffset={dashOffset}
                strokeLinecap="round" transform="rotate(-90 36 36)"
                style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.3s' }}
              />
              <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle"
                fontSize="13" fontWeight="700" fill={timerColor}>{timeLeft}s</text>
            </svg>
          </div>

          <p style={{ fontSize: '11px', color: 'var(--label)', textAlign: 'center', marginBottom: '8px' }}>
            Question {currentIdx + 1} of {questions.length}
          </p>

          {/* Progress Bar */}
          <div style={{ height: '5px', background: 'var(--blue-light)', borderRadius: '10px', marginBottom: '16px' }}>
            <div style={{ height: '100%', width: `${progress}%`, background: 'var(--blue)', borderRadius: '10px', transition: 'width 0.4s' }} />
          </div>

          {/* Question Card */}
          <div style={{ background: 'var(--qcard-bg)', border: '1px solid var(--border)', borderRadius: '12px', padding: '16px', marginBottom: '14px', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}>
            <p style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text)', lineHeight: '1.6' }}>{currentQ.title}</p>
          </div>

          {/* Answer Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {currentQ.options.map((opt, idx) => (
              <button key={idx} onClick={() => handleAnswer(opt)}
                style={{ width: '100%', background: 'var(--qcard-bg)', border: '1.5px solid var(--border)', borderRadius: '12px', padding: '14px 16px', fontSize: '13px', textAlign: 'left', color: 'var(--text)', cursor: 'pointer', fontWeight: '500', transition: 'all 0.15s' }}
                onMouseDown={e => { e.currentTarget.style.background = 'var(--blue-light)'; e.currentTarget.style.borderColor = 'var(--blue-mid)'; }}
                onMouseUp={e => { e.currentTarget.style.background = 'var(--qcard-bg)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
              >
                <span style={{ color: 'var(--blue)', fontWeight: '700', marginRight: '10px' }}>{String.fromCharCode(65 + idx)}.</span>{opt}
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Time Up Dialog */
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
          <div className="animate-popup" style={{ background: 'var(--card)', borderRadius: '20px', width: '84%', padding: '28px 24px', textAlign: 'center', boxShadow: '0 16px 40px rgba(0,0,0,0.25)' }}>
            <span className="msy" style={{ fontSize: '48px', color: 'var(--blue)' }}>timer_off</span>
            <h4 style={{ fontSize: '18px', fontWeight: '700', margin: '12px 0 6px', color: 'var(--text)' }}>Time's up!</h4>
            <p style={{ fontSize: '13px', color: 'var(--green)', fontWeight: '700', marginBottom: '22px' }}>
              Correct answer: {currentQ.correctAnswer}
            </p>
            <button onClick={() => { playClick(); goNext(); }}
              style={{ width: '100%', padding: '14px', background: 'var(--blue)', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '14px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 14px rgba(21,101,192,0.3)' }}>
              Next question
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizScreen;
