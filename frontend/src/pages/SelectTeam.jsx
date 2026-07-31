import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DEFAULT_CATEGORIES = [
  { key: 'cat1', icon: 'gavel', defaultName: 'HR Policy' },
  { key: 'cat2', icon: 'psychology', defaultName: 'IQ Level' },
  { key: 'cat3', icon: 'payments', defaultName: 'Finance' },
];

// Load saved names from localStorage, fallback to defaults
const loadCategories = () => {
  return DEFAULT_CATEGORIES.map(cat => ({
    ...cat,
    name: localStorage.getItem(`categoryName_${cat.key}`) || cat.defaultName,
  }));
};

const SelectTeam = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState(loadCategories());
  const [editingKey, setEditingKey] = useState(null);
  const [editValue, setEditValue] = useState('');

  const startEdit = (e, cat) => {
    e.stopPropagation(); // prevent navigation
    setEditingKey(cat.key);
    setEditValue(cat.name);
  };

  const saveEdit = (key) => {
    const trimmed = editValue.trim() || categories.find(c => c.key === key).defaultName;
    // Save to localStorage
    localStorage.setItem(`categoryName_${key}`, trimmed);
    // Update state
    setCategories(prev => prev.map(c => c.key === key ? { ...c, name: trimmed } : c));
    setEditingKey(null);
  };

  const handleSelect = (cat) => {
    if (editingKey) return; // don't navigate if editing
    // Save the ORIGINAL defaultName for filtering questions (not display name)
    localStorage.setItem('selectedCategory', cat.defaultName);
    // Save display name separately for showing in the header
    localStorage.setItem('selectedCategoryDisplay', cat.name);
    navigate('/hr/questions');
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#fff' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '24px 20px 10px' }}>
        <button onClick={() => navigate(-1)}
          style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#E3F2FD', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
          <span className="msy" style={{ fontSize: '15px', color: '#1565C0' }}>arrow_back</span>
        </button>
        <span style={{ fontSize: '17px', fontWeight: '700', color: '#1A1C1E' }}>Select Team</span>
      </div>

      {/* Category Buttons */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {categories.map((cat, idx) => (
          <div
            key={cat.key}
            onClick={() => handleSelect(cat)}
            style={{
              background: '#E3F2FD',
              border: '1px solid #90CAF9',
              borderRadius: '18px',
              padding: '28px 20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              cursor: 'pointer',
              position: 'relative',
              animation: `popup 0.35s ease forwards`,
              animationDelay: `${idx * 0.08}s`,
              opacity: 0,
              transition: 'transform 0.15s',
            }}
          >
            {/* Icon */}
            <span className="msy" style={{ fontSize: '30px', color: '#1565C0' }}>{cat.icon}</span>

            {/* Editable Name */}
            {editingKey === cat.key ? (
              <input
                autoFocus
                value={editValue}
                onChange={e => setEditValue(e.target.value)}
                onBlur={() => saveEdit(cat.key)}
                onKeyDown={e => {
                  e.stopPropagation();
                  if (e.key === 'Enter') saveEdit(cat.key);
                  if (e.key === 'Escape') setEditingKey(null);
                }}
                onClick={e => e.stopPropagation()}
                style={{
                  border: 'none',
                  borderBottom: '2px solid #1565C0',
                  outline: 'none',
                  fontSize: '15px',
                  fontWeight: '700',
                  color: '#0D47A1',
                  background: 'transparent',
                  textAlign: 'center',
                  width: '160px',
                }}
              />
            ) : (
              <span style={{ fontSize: '15px', fontWeight: '700', color: '#0D47A1' }}>
                {cat.name}
              </span>
            )}

            {/* Edit pencil icon — top right */}
            <button
              onClick={e => editingKey === cat.key ? (e.stopPropagation(), saveEdit(cat.key)) : startEdit(e, cat)}
              style={{
                position: 'absolute', top: '12px', right: '14px',
                background: 'none', border: 'none', cursor: 'pointer', padding: '4px',
              }}
            >
              <span className="msy" style={{ fontSize: '18px', color: editingKey === cat.key ? '#2E7D32' : '#90CAF9' }}>
                {editingKey === cat.key ? 'check_circle' : 'edit'}
              </span>
            </button>
          </div>
        ))}
      </div>

      <p style={{ display: 'none' }}></p>
    </div>
  );
};

export default SelectTeam;
