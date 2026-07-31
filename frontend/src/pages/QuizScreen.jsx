import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

const TIMER_SECONDS = 30;

const QuizScreen = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [showTimeUp, setShowTimeUp] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Use refs for score to avoid async state issues
  const scoreRef = useRef(0);
  const wrongRef = useRef(0);
  const startTimeRef = useRef(null);
  const timerRef = useRef(null);

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
      } else {
        setError('HR ne abhi koi question add nahi kiya hai. Pehle HR Panel mein questions add karein.');
      }
    } catch (err) {
      setError('Backend se connect nahi ho paya. Pehle backend server start karein:\ncmd > node server.js');
    }
    setLoading(false);
  };

  // Timer countdown — only when quiz is started
  useEffect(() => {
    if (!quizStarted || showTimeUp || questions.length === 0) return;
    if (timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft(t => t - 1), 1000);
      return () => clearTimeout(timerRef.current);
    } else {
      wrongRef.current += 1;
      setShowTimeUp(true);
    }
  }, [timeLeft, quizStarted, showTimeUp, questions]);

  const startQuiz = () => {
    startTimeRef.current = Date.now();
    scoreRef.current = 0;
    wrongRef.current = 0;
    setQuizStarted(true);
  };

  const handleAnswer = (selectedOpt) => {
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
      // Quiz finished — save result
      const elapsed = Math.round((Date.now() - startTimeRef.current) / 1000);
      const mins = Math.floor(elapsed / 60);
      const secs = elapsed % 60;
      const result = {
        score: scoreRef.current,
        wrongCount: wrongRef.current,
        time: `${mins}m ${secs}s`,
        total: questions.length,
      };
      localStorage.setItem('quizResult', JSON.stringify(result));

      // Save to MongoDB
      axios.post('http://localhost:5000/api/results', {
        employeeName: player.name,
        employeeId: player.empId,
        score: scoreRef.current,
        totalQuestions: questions.length,
        timeTaken: `${mins}m ${secs}s`,
      }).catch(e => console.warn('Could not save to DB:', e));

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
          Koi Question Nahi Mila
        </h3>
        <p style={{ fontSize: '13px', color: 'var(--label)', lineHeight: '1.6', marginBottom: '32px', whiteSpace: 'pre-line' }}>
          {error || 'HR ne abhi koi question add nahi kiya hai.'}
        </p>
        <button
          onClick={() => navigate('/')}
          style={{ padding: '13px 32px', background: 'var(--blue)', border: 'none', borderRadius: '12px', color: '#fff', fontWeight: '700', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(21,101,192,0.3)' }}
        >
          Home Jao
        </button>
      </div>
    );
  }

  // ── Ready Screen (before timer starts) ──
  if (!quizStarted) {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--card)', padding: '32px' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--blue-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
          <span className="msy" style={{ fontSize: '42px', color: 'var(--blue)' }}>quiz</span>
        </div>
        <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text)', marginBottom: '6px' }}>Ready, {player.name}?</h2>
        <p style={{ fontSize: '13px', color: 'var(--label)', marginBottom: '28px' }}>{questions.length} Questions · {TIMER_SECONDS}s per question</p>

        <div style={{ width: '100%', background: 'var(--input-bg)', borderRadius: '14px', padding: '16px', marginBottom: '32px', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '13px', color: 'var(--sub)' }}>Player</span>
            <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text)' }}>{player.name}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '13px', color: 'var(--sub)' }}>Employee ID</span>
            <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text)' }}>{player.empId}</span>
          </div>
        </div>

        <button
          onClick={startQuiz}
          style={{ width: '100%', padding: '16px', background: 'var(--blue)', border: 'none', borderRadius: '14px', color: '#fff', fontSize: '16px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 6px 20px rgba(21,101,192,0.35)' }}
        >
          Start Quiz →
        </button>
      </div>
    );
  }

  const currentQ = questions[currentIdx];
  const progress = ((currentIdx + 1) / questions.length) * 100;
  const circumference = 2 * Math.PI * 28;
  const dashOffset = circumference * (1 - timeLeft / TIMER_SECONDS);
  const timerColor = timeLeft <= 10 ? 'var(--red)' : 'var(--blue)';

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
              <circle cx="36" cy="36" r="28" fill="none" stroke="var(--blue-light)" strokeWidth="5" />
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
            <button onClick={goNext}
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
