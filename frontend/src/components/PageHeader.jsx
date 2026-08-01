import React from 'react';
import { useNavigate } from 'react-router-dom';
import { playClick } from '../audio';

/**
 * Shared top header — back button + title.
 * Stays fixed at the top of every HR page so it never jumps.
 */
const PageHeader = ({ title, onBack }) => {
  const navigate = useNavigate();

  return (
    <div style={{
      position: 'sticky',
      top: 0,
      zIndex: 10,
      background: 'var(--card)',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '14px 20px',
      minHeight: '56px',
    }}>
      {/* Back button */}
      <button
        onClick={() => {
          playClick();
          if (onBack) onBack();
          else navigate(-1);
        }}
        style={{
          width: '34px',
          height: '34px',
          borderRadius: '50%',
          background: 'var(--back-btn-bg)',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          flexShrink: 0,
          transition: 'transform 0.15s',
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        <span className="msy" style={{ fontSize: '16px', color: 'var(--blue)' }}>arrow_back</span>
      </button>

      {/* Title */}
      <span style={{
        fontSize: '17px',
        fontWeight: '700',
        color: 'var(--text)',
        flex: 1,
      }}>
        {title}
      </span>
    </div>
  );
};

export default PageHeader;
