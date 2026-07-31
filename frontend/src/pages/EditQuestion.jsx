import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../api';
import PageHeader from '../components/PageHeader';

const EditQuestion = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');

  useEffect(() => {
    fetchQuestion();
  }, [id]);

  const fetchQuestion = async () => {
    setLoading(true);
    try {
      const res = await API.get(`/api/questions/${id}`);
      const q = res.data;
      setTitle(q.title);
      setOptions(q.options);
      setCorrectAnswer(q.correctAnswer);
      setCategory(q.category);
    } catch (err) {
      console.error('Fetch failed', err);
    }
    setLoading(false);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    // If this option was the correct answer, update correct answer too
    if (correctAnswer === options[index]) {
      setCorrectAnswer(value);
    }
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const saveQuestion = async () => {
    if (!title.trim()) return setSaveMsg('Question title is required.');
    if (options.some(o => !o.trim())) return setSaveMsg('All options must be filled.');
    if (!correctAnswer) return setSaveMsg('Please select the correct answer.');

    setSaving(true);
    setSaveMsg('');
    try {
      await API.put(`/api/questions/${id}`, {
        title,
        options,
        correctAnswer,
        category,
      });
      setSaveMsg('✓ Saved successfully!');
      // Navigate to /hr/questions so the list re-mounts and shows updated data
      setTimeout(() => navigate('/hr/questions'), 800);
    } catch (err) {
      setSaveMsg('Failed to save. Check backend connection.');
    }
    setSaving(false);
  };

  if (loading) return (
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--card)' }}>
      <p style={{ color: 'var(--label)' }}>Loading...</p>
    </div>
  );

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--card)' }}>

      <PageHeader title="Edit Question" />

      {/* ── Form ── */}
      <div style={{ padding: '24px 20px 30px', display: 'flex', flexDirection: 'column', gap: '20px', flex: 1, overflowY: 'auto' }}>

        {/* Question Title */}
        <div>
          <label style={{ fontSize: '12px', color: 'var(--sub)', display: 'block', marginBottom: '8px' }}>Question Title</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Enter question..."
            style={{ width: '100%', padding: '13px 16px', border: '1.5px solid var(--blue)', borderRadius: '10px', fontSize: '13px', color: 'var(--text)', outline: 'none', background: 'var(--input-bg)' }}
          />
        </div>

        {/* Options with radio for correct answer */}
        <div>
          <label style={{ fontSize: '12px', color: 'var(--sub)', display: 'block', marginBottom: '12px' }}>
            Options — tap <span style={{ color: 'var(--blue)', fontWeight: '700' }}>●</span> to mark correct answer
          </label>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {options.map((opt, index) => {
              const isCorrect = correctAnswer === opt && opt !== '';
              return (
                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {/* Radio circle — click to set correct */}
                  <div
                    onClick={() => opt.trim() && setCorrectAnswer(opt)}
                    style={{
                      width: '20px', height: '20px', borderRadius: '50%',
                      border: `2px solid ${isCorrect ? 'var(--blue)' : 'var(--blue-mid)'}`,
                      background: isCorrect ? 'var(--blue)' : 'var(--input-bg)',
                      flexShrink: 0, cursor: 'pointer', transition: 'all 0.2s',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    {isCorrect && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#fff' }} />}
                  </div>

                  {/* Option text input */}
                  <input
                    type="text"
                    value={opt}
                    onChange={e => handleOptionChange(index, e.target.value)}
                    style={{
                      flex: 1, padding: '12px 14px',
                      border: `1.5px solid ${isCorrect ? 'var(--blue)' : 'var(--border)'}`,
                      borderRadius: '10px', fontSize: '13px', color: 'var(--text)', outline: 'none',
                      background: isCorrect ? 'var(--blue-light)' : 'var(--input-bg)',
                      transition: 'all 0.2s',
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Save message */}
        {saveMsg && (
          <p style={{ fontSize: '13px', color: saveMsg.startsWith('✓') ? 'var(--green)' : 'var(--red)', fontWeight: '600', textAlign: 'center' }}>
            {saveMsg}
          </p>
        )}

        {/* Save Button */}
        <button
          onClick={saveQuestion}
          disabled={saving}
          style={{
            width: '100%', padding: '15px',
            background: saving ? 'var(--blue-mid)' : 'var(--blue)',
            border: 'none', borderRadius: '12px', color: '#fff',
            fontSize: '15px', fontWeight: '700',
            cursor: saving ? 'not-allowed' : 'pointer',
            boxShadow: '0 6px 20px rgba(21,101,192,0.3)',
          }}
        >
          {saving ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  );
};

export default EditQuestion;
