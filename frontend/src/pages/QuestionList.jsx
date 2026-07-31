import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

const CATEGORIES = ['HR Policy', 'IQ Level', 'Finance'];

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
      await axios.post('http://localhost:5000/api/questions', form);
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
      await axios.delete(`http://localhost:5000/api/questions/${id}`);
      fetchQuestions();
    } catch (e) {
      alert('Failed to delete');
    }
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#fff', position: 'relative' }}>

      {/* ── Header with editable pill title ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '20px 20px 10px' }}>
        <button onClick={() => navigate(-1)} style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#E3F2FD', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
          <span className="msy" style={{ fontSize: '15px', color: '#1565C0' }}>arrow_back</span>
        </button>

        {/* Static Pill Title — shows selected category */}
        <div style={{ flex: 1, border: '1.5px solid #1565C0', borderRadius: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px 16px', background: '#fff' }}>
          <span style={{ fontSize: '14px', fontWeight: '700', color: '#1A1C1E', textAlign: 'center' }}>
            {headerTitle}
          </span>
        </div>
      </div>

      {/* ── Question List ── */}
      <div style={{ padding: '10px 20px 100px', flex: 1, overflowY: 'auto' }}>
        {loading ? (
          <p style={{ textAlign: 'center', marginTop: '40px', color: '#9E9E9E' }}>Loading...</p>
        ) : questions.length === 0 ? (
          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <span className="msy" style={{ fontSize: '48px', color: '#E3F2FD' }}>quiz</span>
            <p style={{ color: '#9E9E9E', marginTop: '12px', fontSize: '14px' }}>
              No questions for "{selectedCategory}".<br />Tap + to add one.
            </p>
          </div>
        ) : (
          questions.map((q, idx) => (
            <div
              key={q._id}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', border: '1px solid #E4E7EC', borderRadius: '14px', padding: '14px 16px', marginBottom: '12px', boxShadow: '0 2px 6px rgba(0,0,0,0.04)', animation: 'popup 0.3s ease forwards', animationDelay: `${idx * 0.04}s`, opacity: 0 }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#0D47A1', marginBottom: '4px' }}>Q{idx + 1}</div>
                <div style={{ fontSize: '12px', color: '#5F6368', marginBottom: '3px' }}>
                  {q.title.length > 32 ? q.title.substring(0, 32) + '...' : q.title}
                </div>
                <span style={{ fontSize: '10px', color: '#90CAF9', fontWeight: '600' }}>{q.category}</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span className="msy" onClick={() => navigate(`/hr/edit/${q._id}`)} style={{ fontSize: '20px', color: '#1565C0', cursor: 'pointer' }}>edit</span>
                <span className="msy" onClick={() => handleDelete(q._id)} style={{ fontSize: '20px', color: '#D32F2F', cursor: 'pointer' }}>delete</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ── FAB ── */}
      <button
        onClick={openAdd}
        style={{ position: 'absolute', bottom: '24px', right: '24px', width: '56px', height: '56px', borderRadius: '50%', background: '#1565C0', border: 'none', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 20px rgba(21,101,192,0.4)', cursor: 'pointer', zIndex: 10 }}
      >
        <span className="msy" style={{ fontSize: '28px' }}>add</span>
      </button>

      {/* ── Add Question Modal ── */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(10,20,40,0.5)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ background: '#fff', borderRadius: '24px 24px 0 0', width: '100%', maxWidth: '480px', padding: '24px', maxHeight: '90vh', overflowY: 'auto' }}>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#1A1C1E' }}>Add New Question</h3>
              <button onClick={() => setShowModal(false)} style={{ background: '#F5F5F5', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="msy" style={{ fontSize: '18px', color: '#5F6368' }}>close</span>
              </button>
            </div>

            {/* Category */}
            <label style={{ fontSize: '12px', color: '#5F6368', display: 'block', marginBottom: '6px' }}>Category</label>
            <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
              style={{ width: '100%', padding: '12px', border: '1.5px solid #E4E7EC', borderRadius: '10px', fontSize: '13px', marginBottom: '16px', color: '#1A1C1E', outline: 'none' }}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            {/* Question Title */}
            <label style={{ fontSize: '12px', color: '#5F6368', display: 'block', marginBottom: '6px' }}>Question</label>
            <textarea value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. What is the capital of India?" rows={3}
              style={{ width: '100%', padding: '12px', border: '1.5px solid #E4E7EC', borderRadius: '10px', fontSize: '13px', marginBottom: '16px', color: '#1A1C1E', outline: 'none', resize: 'none' }} />

            {/* Options */}
            <label style={{ fontSize: '12px', color: '#5F6368', display: 'block', marginBottom: '10px' }}>
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
                  style={{ flex: 1, padding: '10px 12px', border: `1.5px solid ${form.correctAnswer === opt && opt ? '#1565C0' : '#E4E7EC'}`, borderRadius: '10px', fontSize: '13px', outline: 'none', color: '#1A1C1E', background: form.correctAnswer === opt && opt ? '#E3F2FD' : '#fff' }} />
                <button onClick={() => removeOption(idx)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                  <span className="msy" style={{ fontSize: '18px', color: '#D32F2F' }}>remove_circle</span>
                </button>
              </div>
            ))}

            <button onClick={addOption} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: '#1565C0', fontSize: '13px', fontWeight: '600', cursor: 'pointer', marginBottom: '20px' }}>
              <span className="msy" style={{ fontSize: '18px' }}>add_circle</span> Add Option
            </button>

            {error && <p style={{ color: '#D32F2F', fontSize: '12px', marginBottom: '12px' }}>{error}</p>}

            <button onClick={handleSave} disabled={saving}
              style={{ width: '100%', padding: '15px', background: saving ? '#90CAF9' : '#1565C0', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '15px', fontWeight: '700', cursor: saving ? 'not-allowed' : 'pointer', boxShadow: '0 4px 14px rgba(21,101,192,0.3)' }}>
              {saving ? 'Saving...' : 'Save Question'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionList;
