import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import PageHeader from '../components/PageHeader';

// Same structure as SelectTeam — loads custom names from localStorage
const DEFAULT_CATEGORIES = [
  { key: 'cat1', defaultName: 'HR Policy' },
  { key: 'cat2', defaultName: 'IQ Level' },
  { key: 'cat3', defaultName: 'Finance' },
];

// Load display names saved by SelectTeam (Choose Title page)
const loadCategoryOptions = () =>
  DEFAULT_CATEGORIES.map(cat => ({
    value: cat.defaultName,                                          // stored in DB
    label: localStorage.getItem(`categoryName_${cat.key}`) || cat.defaultName, // shown in UI
  }));

const emptyForm = {
  title: '',
  options: ['', '', '', ''],
  correctAnswer: '',
  category: 'HR Policy',
};

const QuestionList = () => {
  const navigate = useNavigate();
  const selectedCategory = localStorage.getItem('selectedCategory') || '';
  const displayName = localStorage.getItem('selectedCategoryDisplay') || selectedCategory || 'All Questions';
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ ...emptyForm, category: selectedCategory || 'HR Policy' });
  // Re-load category options each time modal opens so renames from SelectTeam appear
  const [categoryOptions, setCategoryOptions] = useState(loadCategoryOptions);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const headerTitle = displayName;

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const res = await API.get('/api/questions/all');
      // Filter by selected category if set
      const filtered = selectedCategory
        ? res.data.filter(q => q.category === selectedCategory)
        : res.data;
      setQuestions(filtered);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const openAdd = () => {
    // Refresh category names in case SelectTeam renamed them
    setCategoryOptions(loadCategoryOptions());
    setForm({ ...emptyForm, category: selectedCategory || 'HR Policy' });
    setError('');
    setShowModal(true);
  };

  const handleOptionChange = (idx, val) => {
    const opts = [...form.options];
    const wasCorrect = form.correctAnswer === form.options[idx];
    opts[idx] = val;
    setForm({ ...form, options: opts, correctAnswer: wasCorrect ? val : form.correctAnswer });
  };

  const addOption = () => {
    setForm({ ...form, options: [...form.options, ''] });
  };

  const removeOption = (idx) => {
    if (form.options.length <= 2) return;
    const opts = form.options.filter((_, i) => i !== idx);
    const newCorrect = form.correctAnswer === form.options[idx] ? '' : form.correctAnswer;
    setForm({ ...form, options: opts, correctAnswer: newCorrect });
  };

  const handleSave = async () => {
    setError('');
    if (!form.title.trim()) return setError('Question title is required.');
    if (form.options.some(o => !o.trim())) return setError('All options must be filled.');
    if (!form.correctAnswer) return setError('Please select the correct answer.');
    setSaving(true);
    try {
      await API.post('/api/questions', form);
      setShowModal(false);
      fetchQuestions();
    } catch (e) {
      setError('Failed to save. Check backend connection.');
    }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this question?')) return;
    try {
      await API.delete(`/api/questions/${id}`);
      fetchQuestions();
    } catch (e) {
      alert('Failed to delete');
    }
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--card)', position: 'relative' }}>

      <PageHeader title={headerTitle} />

      {/* ── Question List ── */}
      <div style={{ padding: '10px 20px 100px', flex: 1, overflowY: 'auto' }}>
        {loading ? (
          <p style={{ textAlign: 'center', marginTop: '40px', color: 'var(--label)' }}>Loading...</p>
        ) : questions.length === 0 ? (
          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <span className="msy" style={{ fontSize: '48px', color: 'var(--blue-light)' }}>quiz</span>
            <p style={{ color: 'var(--label)', marginTop: '12px', fontSize: '14px' }}>
              No questions for "{selectedCategory}".<br />Tap + to add one.
            </p>
          </div>
        ) : (
          questions.map((q, idx) => (
            <div
              key={q._id}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--qcard-bg)', border: '1px solid var(--border)', borderRadius: '14px', padding: '14px 16px', marginBottom: '12px', boxShadow: '0 2px 6px rgba(0,0,0,0.04)', animation: 'popup 0.3s ease forwards', animationDelay: `${idx * 0.04}s`, opacity: 0 }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--blue-dark)', marginBottom: '4px' }}>Q{idx + 1}</div>
                <div style={{ fontSize: '12px', color: 'var(--sub)', marginBottom: '3px' }}>
                  {q.title.length > 32 ? q.title.substring(0, 32) + '...' : q.title}
                </div>
                <span style={{ fontSize: '10px', color: 'var(--blue-mid)', fontWeight: '600' }}>{q.category}</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span className="msy" onClick={() => navigate(`/hr/edit/${q._id}`)} style={{ fontSize: '20px', color: 'var(--blue)', cursor: 'pointer' }}>edit</span>
                <span className="msy" onClick={() => handleDelete(q._id)} style={{ fontSize: '20px', color: 'var(--red)', cursor: 'pointer' }}>delete</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ── FAB ── */}
      <button
        onClick={openAdd}
        style={{ position: 'absolute', bottom: '24px', right: '24px', width: '56px', height: '56px', borderRadius: '50%', background: 'var(--blue)', border: 'none', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 20px rgba(21,101,192,0.4)', cursor: 'pointer', zIndex: 10 }}
      >
        <span className="msy" style={{ fontSize: '28px' }}>add</span>
      </button>

      {/* ── Add Question Modal ── */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(10,20,40,0.5)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ background: 'var(--card)', borderRadius: '24px 24px 0 0', width: '100%', maxWidth: '480px', padding: '24px', maxHeight: '90vh', overflowY: 'auto' }}>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text)' }}>Add New Question</h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'var(--input-bg)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="msy" style={{ fontSize: '18px', color: 'var(--sub)' }}>close</span>
              </button>
            </div>

            {/* Category — shows custom names from Choose Title page */}
            <label style={{ fontSize: '12px', color: 'var(--sub)', display: 'block', marginBottom: '6px' }}>Category</label>
            <select
              value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })}
              style={{ width: '100%', padding: '12px', border: '1.5px solid var(--border)', borderRadius: '10px', fontSize: '13px', marginBottom: '16px', color: 'var(--text)', outline: 'none', background: 'var(--input-bg)' }}
            >
              {categoryOptions.map(c => (
                <option key={c.value} value={c.value} hidden={c.value === form.category}>
                  {c.label}
                </option>
              ))}
            </select>

            {/* Question Title */}
            <label style={{ fontSize: '12px', color: 'var(--sub)', display: 'block', marginBottom: '6px' }}>Question</label>
            <textarea value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. What is the capital of India?" rows={3}
              style={{ width: '100%', padding: '12px', border: '1.5px solid var(--border)', borderRadius: '10px', fontSize: '13px', marginBottom: '16px', color: 'var(--text)', outline: 'none', resize: 'none', background: 'var(--input-bg)' }} />

            {/* Options */}
            <label style={{ fontSize: '12px', color: 'var(--sub)', display: 'block', marginBottom: '10px' }}>
              Options — tap <span style={{ color: '#1565C0' }}>●</span> to mark correct answer
            </label>
            {form.options.map((opt, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <div
                  onClick={() => setForm({ ...form, correctAnswer: opt })}
                  style={{ width: '20px', height: '20px', borderRadius: '50%', border: `2px solid ${form.correctAnswer === opt && opt ? '#1565C0' : '#90CAF9'}`, background: form.correctAnswer === opt && opt ? '#1565C0' : '#fff', flexShrink: 0, cursor: 'pointer', transition: 'all 0.2s' }}
                />
                <input type="text" value={opt} placeholder={`Option ${String.fromCharCode(65 + idx)}`}
                  onChange={e => handleOptionChange(idx, e.target.value)}
                  style={{ flex: 1, padding: '10px 12px', border: `1.5px solid ${form.correctAnswer === opt && opt ? 'var(--blue)' : 'var(--border)'}`, borderRadius: '10px', fontSize: '13px', outline: 'none', color: 'var(--text)', background: form.correctAnswer === opt && opt ? 'var(--blue-light)' : 'var(--input-bg)' }} />
                <button onClick={() => removeOption(idx)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                  <span className="msy" style={{ fontSize: '18px', color: '#D32F2F' }}>remove_circle</span>
                </button>
              </div>
            ))}

            <button onClick={addOption} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: 'var(--blue)', fontSize: '13px', fontWeight: '600', cursor: 'pointer', marginBottom: '20px' }}>
              <span className="msy" style={{ fontSize: '18px' }}>add_circle</span> Add Option
            </button>

            {error && <p style={{ color: '#D32F2F', fontSize: '12px', marginBottom: '12px' }}>{error}</p>}

            <button onClick={handleSave} disabled={saving}
              style={{ width: '100%', padding: '15px', background: saving ? 'var(--blue-mid)' : 'var(--blue)', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '15px', fontWeight: '700', cursor: saving ? 'not-allowed' : 'pointer', boxShadow: '0 4px 14px rgba(21,101,192,0.3)' }}>
              {saving ? 'Saving...' : 'Save Question'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionList;
