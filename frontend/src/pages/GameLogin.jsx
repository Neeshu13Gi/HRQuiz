import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
const Sparkle = ({ top, left, right, size = 14 }) => (
  <span style={{
    position: 'absolute', top, left, right,
    fontSize: size, color: 'var(--blue)', opacity: 0.7,
    pointerEvents: 'none', userSelect: 'none',
  }}>✦</span>
);

const GameLogin = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [empId, setEmpId] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (name && empId) {
      localStorage.setItem('currentPlayer', JSON.stringify({ name, empId }));
      navigate('/quiz');
    }
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

      {/* ── Back Button ── */}
      <button
        onClick={() => navigate(-1)}
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
        padding: '70px 28px 36px',
      }}>

        {/* ── Hero Icon ── */}
        <div style={{ position: 'relative', marginBottom: '20px' }}>
          <Sparkle top="-4px" left="2px" size={12} />
          <Sparkle top="4px" right="0px" size={14} />
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
          fontSize: '12px',
          color: 'var(--sub)',
          marginBottom: '32px',
          textAlign: 'center',
        }}>
          Please enter your details to continue
        </p>

        {/* ── Form ── */}
        <form onSubmit={handleLogin} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0' }}>

          {/* Employee Name */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="msy" style={{ fontSize: '16px', color: 'var(--blue)' }}>badge</span>
              <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text)' }}>
                Employee Name
              </label>
            </div>
            <div style={{ position: 'relative' }}>
              <span className="msy" style={{
                position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
                fontSize: '18px', color: 'var(--sub)',
              }}>person</span>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Enter Name.."
                required
                style={{
                  width: '100%',
                  padding: '13px 16px 13px 44px',
                  border: '1.5px solid var(--border)',
                  borderRadius: '14px',
                  fontSize: '14px',
                  color: 'var(--text)',
                  outline: 'none',
                  background: 'var(--input-bg)',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => e.target.style.borderColor = 'var(--blue)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
            </div>
          </div>

          {/* Employee ID */}
          <div style={{ marginBottom: '36px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="msy" style={{ fontSize: '16px', color: 'var(--blue)' }}>badge</span>
              <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text)' }}>
                Employee ID
              </label>
            </div>
            <div style={{ position: 'relative' }}>
              <span className="msy" style={{
                position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
                fontSize: '18px', color: 'var(--sub)',
              }}>id_card</span>
              <input
                type="text"
                value={empId}
                onChange={e => setEmpId(e.target.value)}
                placeholder="092"
                required
                style={{
                  width: '100%',
                  padding: '13px 16px 13px 44px',
                  border: '1.5px solid var(--border)',
                  borderRadius: '14px',
                  fontSize: '14px',
                  color: 'var(--text)',
                  outline: 'none',
                  background: 'var(--input-bg)',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => e.target.style.borderColor = 'var(--blue)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
            </div>
          </div>

          {/* Login Button */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              type="submit"
              style={{
                width: '240px',
                padding: '14px 24px',
                background: 'var(--hero-grad)',
                border: 'none',
                borderRadius: '50px',
                color: '#fff',
                fontSize: '15px',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(79,70,229,0.40)',
                letterSpacing: '0.3px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'transform 0.15s, box-shadow 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(79,70,229,0.55)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(79,70,229,0.40)'; }}
            >
              Login
              <span className="msy" style={{ fontSize: '18px' }}>arrow_forward</span>
            </button>
          </div>

        </form>
      </div>

      {/* ── Bottom dot grid ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 4px)',
        gap: '7px',
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        pointerEvents: 'none',
      }}>
        {Array.from({ length: 25 }).map((_, i) => (
          <div key={i} style={{
            width: 4, height: 4, borderRadius: '50%',
            background: 'var(--blue)', opacity: 0.12,
          }} />
        ))}
      </div>
    </div>
  );
};

export default GameLogin;
