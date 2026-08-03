import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { playClick } from '../audio';

/* ── Decorative dot grid (top-right corner) ── */
const DotGrid = () => {
  const dots = [];
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
      dots.push(
        <div key={`${r}-${c}`} style={{
          width: 4, height: 4,
          borderRadius: '50%',
          background: 'var(--blue)',
          opacity: 0.18,
        }} />
      );
    }
  }
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 4px)',
      gap: '7px',
      position: 'absolute',
      top: '20px',
      right: '20px',
      pointerEvents: 'none',
    }}>
      {dots}
    </div>
  );
};

/* ── Sparkle ── */
const Sparkle = ({ top, left, right, size = 14, color = 'var(--blue)' }) => (
  <span className="msy" style={{
    position: 'absolute', top, left, right,
    fontSize: size, color: color, opacity: 0.7,
    pointerEvents: 'none', userSelect: 'none',
  }}>stars</span>
);

const GameLogin = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [empId, setEmpId] = useState('');
  const [step, setStep] = useState(1);

  const handleNext = (e) => {
    e.preventDefault();
    playClick();
    if (name && empId) {
      setStep(2);
    }
  };

  const handleStartQuiz = () => {
    playClick();
    localStorage.setItem('currentPlayer', JSON.stringify({ name, empId }));
    navigate('/quiz');
  };

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--card)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <style>{`
        @keyframes popIn {
          0% { transform: scale(0.3); opacity: 0; }
          60% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes fadeInUp {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-pop { animation: popIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) both; }
        .animate-fade { animation: fadeInUp 0.5s ease-out both; }
        .gl-input:focus { border-color: var(--blue) !important; }
      `}</style>

      {/* ── Back Button ── */}
      <button
        onClick={() => { playClick(); step === 2 ? setStep(1) : navigate(-1); }}
        style={{
          position: 'absolute', top: '20px', left: '20px',
          width: '36px', height: '36px',
          borderRadius: '50%',
          background: 'var(--back-btn-bg)',
          border: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', zIndex: 2,
        }}
      >
        <span className="msy" style={{ fontSize: '18px', color: 'var(--blue)' }}>arrow_back</span>
      </button>

      {/* ── Dot Grid decoration ── */}
      <DotGrid />

      {/* ── Body ── */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '70px 24px 36px',
        width: '100%',
      }}>
        {step === 1 ? (
          <div className="animate-fade" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* ── Hero Icon ── */}
            <div className="animate-pop" style={{ position: 'relative', marginBottom: '20px' }}>
              <Sparkle top="-4px" left="2px" size={14} />
              <Sparkle top="4px" right="0px" size={16} />
              <div style={{
                width: '76px', height: '76px',
                borderRadius: '50%',
                background: 'var(--blue-light)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span className="msy" style={{ fontSize: '36px', color: 'var(--blue)' }}>sports_esports</span>
              </div>
            </div>

            {/* ── Title ── */}
            <h1 style={{
              fontSize: '24px',
              fontWeight: '800',
              color: 'var(--text)',
              marginBottom: '6px',
              letterSpacing: '-0.3px',
            }}>
              Start Game
            </h1>

            {/* ── Subtitle ── */}
            <p style={{
              fontSize: '13px',
              color: 'var(--sub)',
              marginBottom: '32px',
              textAlign: 'center',
            }}>
              Please enter your details to continue
            </p>

            {/* ── Form ── */}
            <form onSubmit={handleNext} style={{ width: '100%', maxWidth: '300px', display: 'flex', flexDirection: 'column', gap: '0' }}>
              {/* Employee Name */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text)' }}>Employee Name</label>
                </div>
                <div style={{ position: 'relative' }}>
                  <span className="msy" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '18px', color: 'var(--label)' }}>person</span>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Enter Name.."
                    required
                    className="gl-input"
                    style={{
                      width: '100%', padding: '14px 16px 14px 44px',
                      border: '1.5px solid var(--border)', borderRadius: '14px',
                      fontSize: '14px', color: 'var(--text)', outline: 'none',
                      background: 'var(--input-bg)',
                      transition: 'border-color 0.2s',
                    }}
                  />
                </div>
              </div>

              {/* Employee ID */}
              <div style={{ marginBottom: '36px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text)' }}>Employee ID</label>
                </div>
                <div style={{ position: 'relative' }}>
                  <span className="msy" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '18px', color: 'var(--label)' }}>id_card</span>
                  <input
                    type="text"
                    value={empId}
                    onChange={e => setEmpId(e.target.value)}
                    placeholder="092"
                    required
                    className="gl-input"
                    style={{
                      width: '100%', padding: '14px 16px 14px 44px',
                      border: '1.5px solid var(--border)', borderRadius: '14px',
                      fontSize: '14px', color: 'var(--text)', outline: 'none',
                      background: 'var(--input-bg)',
                      transition: 'border-color 0.2s',
                    }}
                  />
                </div>
              </div>

              {/* Next Button */}
              <button
                type="submit"
                style={{
                  width: '100%', padding: '16px 24px', background: 'var(--hero-grad)',
                  border: 'none', borderRadius: '16px', color: '#fff', fontSize: '16px', fontWeight: '700',
                  cursor: 'pointer', boxShadow: '0 8px 24px rgba(79,70,229,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                }}
              >
                Continue <span className="msy" style={{ fontSize: '20px' }}>arrow_forward</span>
              </button>
            </form>
          </div>
        ) : (
          /* ── STEP 2: READY SCREEN ── */
          <div className="animate-fade" style={{ width: '100%', maxWidth: '320px', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
            
            {/* Background elements */}
            <div style={{ position: 'absolute', top: '80px', left: '50%', transform: 'translateX(-50%)', width: '220px', height: '140px', pointerEvents: 'none' }}>
              <div style={{ position: 'absolute', top: '0px', left: '20px', width: '8px', height: '8px', background: '#FFC107', borderRadius: '50%' }}></div>
              <div style={{ position: 'absolute', top: '60px', left: '-10px', width: '6px', height: '6px', background: 'var(--blue-mid)', borderRadius: '50%' }}></div>
              <div style={{ position: 'absolute', top: '-10px', right: '40px', width: '8px', height: '8px', background: 'var(--blue-mid)', borderRadius: '50%' }}></div>
              <div style={{ position: 'absolute', top: '55px', right: '-5px', width: '8px', height: '8px', background: '#FFC107', borderRadius: '50%' }}></div>
            </div>

            {/* Central Icon */}
            <div className="animate-pop" style={{ width: '110px', height: '110px', borderRadius: '50%', background: 'var(--blue-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '10px', left: '-20px', color: 'var(--blue-mid)' }}><Sparkle top="0" left="0" size={18} color="var(--blue-mid)" /></div>
              <div style={{ position: 'absolute', bottom: '20px', right: '-25px', color: 'var(--blue-mid)' }}><Sparkle top="0" left="0" size={24} color="var(--blue-mid)" /></div>
              
              <div style={{ width: '60px', height: '60px', background: 'var(--blue)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'rotate(-5deg)', boxShadow: '0 8px 16px rgba(79,70,229,0.3)' }}>
                <span style={{ fontSize: '36px', color: '#fff', fontWeight: '800', lineHeight: 1 }}>?</span>
              </div>
            </div>

            <h1 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text)', marginBottom: '8px' }}>
              Ready, {name.split(' ')[0]}?
            </h1>
            <p style={{ fontSize: '14px', color: 'var(--sub)', marginBottom: '32px', fontWeight: '500' }}>
              {localStorage.getItem('questionCount') || 10} Questions • 10s per question
            </p>

            {/* Player Details Card */}
            <div style={{ width: '100%', background: 'var(--qcard-bg)', border: '1px solid var(--border)', borderRadius: '16px', padding: '16px 20px', marginBottom: '32px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
              {/* Row 1 */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--blue-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="msy" style={{ fontSize: '18px', color: 'var(--blue)' }}>person</span>
                  </div>
                  <span style={{ fontSize: '14px', color: 'var(--sub)', fontWeight: '500' }}>Player</span>
                </div>
                <span style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text)' }}>{name.split(' ')[0]}</span>
              </div>
              
              {/* Divider */}
              <div style={{ height: '1px', background: 'var(--border)', width: '100%', marginBottom: '16px' }}></div>
              
              {/* Row 2 */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--blue-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="msy" style={{ fontSize: '18px', color: 'var(--blue)' }}>badge</span>
                  </div>
                  <span style={{ fontSize: '14px', color: 'var(--sub)', fontWeight: '500' }}>Employee ID</span>
                </div>
                <span style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text)' }}>{empId}</span>
              </div>
            </div>

            {/* Start Quiz Button */}
            <button
              onClick={handleStartQuiz}
              style={{
                width: '100%', padding: '18px 24px', background: 'var(--hero-grad)',
                border: 'none', borderRadius: '16px', color: '#fff', fontSize: '17px', fontWeight: '700',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                boxShadow: '0 8px 24px rgba(79,70,229,0.35)', transition: 'transform 0.2s',
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              Start Quiz <span className="msy" style={{ fontSize: '22px' }}>arrow_forward</span>
            </button>
          </div>
        )}
      </div>

    </div>
  );
};

export default GameLogin;
