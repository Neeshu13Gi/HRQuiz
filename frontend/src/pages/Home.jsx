import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import { playClick } from '../audio';

/* ── Decorative floating dot ── */
const Dot = ({ top, left, right, size = 6, delay = 0, opacity = 0.5 }) => (
  <div style={{
    position: 'absolute',
    top, left, right,
    width: size, height: size,
    borderRadius: '50%',
    background: 'var(--blue)',
    opacity,
    animation: `floatDot ${2.4 + delay * 0.4}s ease-in-out ${delay * 0.3}s infinite`,
    pointerEvents: 'none',
  }} />
);

/* ── Small diamond shape ── */
const Diamond = ({ top, left, right, size = 6, opacity = 0.3 }) => (
  <div style={{
    position: 'absolute',
    top, left, right,
    width: size, height: size,
    background: 'var(--blue)',
    opacity,
    transform: 'rotate(45deg)',
    pointerEvents: 'none',
  }} />
);

const FEATURES = [
  { icon: 'emoji_events', label: 'Exciting\nQuizzes' },
  { icon: 'star_rate', label: 'Earn\nRewards' },
];

const Home = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      background: 'var(--card)',
      padding: '0 28px 36px',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* ── Decorative dots ── */}
      <Dot top="80px" left="18px" size={5} delay={0} opacity={0.4} />
      <Dot top="130px" left="38px" size={3} delay={1} opacity={0.3} />
      <Dot top="60px" right="22px" size={4} delay={2} opacity={0.4} />
      <Dot top="170px" right="14px" size={6} delay={0.5} opacity={0.25} />
      <Diamond top="100px" left="60px" size={5} opacity={0.2} />
      <Diamond top="90px" right="55px" size={4} opacity={0.2} />
      <div style={{ position: 'absolute', top: '62px', left: '8px', fontSize: '18px', color: 'var(--blue)', opacity: 0.2, pointerEvents: 'none', fontWeight: '300' }}>+</div>
      <div style={{ position: 'absolute', top: '200px', right: '8px', fontSize: '18px', color: 'var(--blue)', opacity: 0.2, pointerEvents: 'none', fontWeight: '300' }}>+</div>

      {/* ── Theme Switcher ── */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', paddingTop: '18px', paddingBottom: '0', zIndex: 2 }}>
        <div className="theme-switcher">
          <button
            className={`theme-btn${theme === 'dark' ? ' active' : ''}`}
            onClick={() => { playClick(); setTheme('dark'); }}
          >
            <span className="msy" style={{ fontSize: '13px' }}>dark_mode</span>
            Dark
          </button>
          <button
            className={`theme-btn${theme === 'light' ? ' active' : ''}`}
            onClick={() => { playClick(); setTheme('light'); }}
          >
            <span className="msy" style={{ fontSize: '13px' }}>light_mode</span>
            Light
          </button>
        </div>
      </div>

      {/* ── Hero Icon ── */}
      <div style={{ marginTop: '32px', marginBottom: '24px', position: 'relative', zIndex: 2 }}>
        {/* Outer glow ring */}
        <div style={{
          width: '120px', height: '120px',
          borderRadius: '32px',
          background: 'var(--blue-light)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative',
        }}>
          {/* Corner dots on ring */}
          <div style={{ position: 'absolute', top: '-4px', left: '50%', transform: 'translateX(-50%)', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--blue)', opacity: 0.5 }} />
          <div style={{ position: 'absolute', bottom: '-4px', left: '50%', transform: 'translateX(-50%)', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--blue)', opacity: 0.5 }} />
          <div style={{ position: 'absolute', left: '-4px', top: '50%', transform: 'translateY(-50%)', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--blue)', opacity: 0.5 }} />
          <div style={{ position: 'absolute', right: '-4px', top: '50%', transform: 'translateY(-50%)', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--blue)', opacity: 0.5 }} />

          {/* Inner icon box */}
          <div style={{
            width: '80px', height: '80px',
            borderRadius: '22px',
            background: 'var(--hero-grad)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 12px 32px rgba(79,70,229,0.40)',
          }}>
            <span className="msy" style={{ color: '#fff', fontSize: '40px' }}>quiz</span>
          </div>
        </div>
      </div>

      {/* ── Title ── */}
      <h1 style={{
        fontSize: '26px',
        fontWeight: '800',
        color: 'var(--text)',
        textAlign: 'center',
        letterSpacing: '-0.3px',
        marginBottom: '8px',
        zIndex: 2,
      }}>
        Quiz Challenge
      </h1>

      {/* ── Divider with dot ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', zIndex: 2 }}>
        <div style={{ width: '30px', height: '2px', borderRadius: '2px', background: 'var(--blue-mid)' }} />
        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--blue)' }} />
        <div style={{ width: '30px', height: '2px', borderRadius: '2px', background: 'var(--blue-mid)' }} />
      </div>

      {/* ── Subtitle ── */}
      <p style={{
        fontSize: '12px',
        color: 'var(--sub)',
        textAlign: 'center',
        lineHeight: '1.7',
        marginBottom: '28px',
        zIndex: 2,
        maxWidth: '240px',
      }}>
        Test your knowledge.<br />
        Beat the challenge. Become a quiz master!
      </p>

      {/* ── Feature Pills ── */}
      <div style={{
        display: 'flex',
        gap: '16px',
        marginBottom: '36px',
        zIndex: 2,
      }}>
        {FEATURES.map(f => (
          <div key={f.label} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            background: 'var(--blue-light)',
            borderRadius: '16px',
            padding: '16px 20px',
            minWidth: '90px',
          }}>
            <span className="msy" style={{ fontSize: '26px', color: 'var(--blue)' }}>{f.icon}</span>
            <span style={{
              fontSize: '11px',
              fontWeight: '600',
              color: 'var(--blue-dark)',
              textAlign: 'center',
              lineHeight: '1.4',
              whiteSpace: 'pre-line',
            }}>{f.label}</span>
          </div>
        ))}
      </div>

      {/* ── Buttons ── */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', zIndex: 2 }}>
        {/* HR Panel — outline */}
        <button
          onClick={() => { playClick(); navigate('/hr/panel'); }}
          style={{
            width: '240px',
            padding: '14px 24px',
            background: 'transparent',
            border: '1.5px solid var(--blue)',
            borderRadius: '50px',
            fontSize: '14px',
            fontWeight: '600',
            color: 'var(--blue)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: 'pointer',
            transition: 'background 0.2s, transform 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--blue-light)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <span className="msy" style={{ fontSize: '18px' }}>badge</span>
          HR Panel
        </button>

        {/* Start Game — filled */}
        <button
          onClick={() => { playClick(); navigate('/login'); }}
          style={{
            width: '240px',
            padding: '14px 24px',
            background: 'var(--hero-grad)',
            border: 'none',
            borderRadius: '50px',
            fontSize: '14px',
            fontWeight: '700',
            color: '#fff',
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
          Start Game
          <span className="msy" style={{ fontSize: '18px' }}>arrow_forward</span>
        </button>
      </div>
    </div>
  );
};

export default Home;
