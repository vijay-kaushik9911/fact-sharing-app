import { useState } from 'react';
import supabase from '../supabase';
import { CATEGORIES } from '../constants';

export default function NewFactForm({ setFacts, setShowForm }) {
  const [text, setText] = useState('');
  const [source, setSource] = useState('');
  const [category, setCategory] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const textLength = text.length;

  function isValidHttpUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    if (!text || !isValidHttpUrl(source) || !category || textLength > 200) {
      alert("Please fill all fields properly!");
      return;
    }

    setIsUploading(true);
    try {
      const { data: newFact, error } = await supabase
        .from('facts')
        .insert([{ text, source, category }])
        .select();

      if (error) throw error;

      setFacts(facts => [newFact[0], ...facts]);
      setText('');
      setSource('');
      setCategory('');
      setShowForm(false);
    } catch (err) {
      alert('Failed to post fact: ' + err.message);
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <form className='fact-form' onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Share a fact with the world...'
        value={text}
        onChange={e => setText(e.target.value)}
        disabled={isUploading}
        maxLength={200}
      />
      <span>{200 - textLength}</span>
      <input
        type='text'
        placeholder='Trustworthy source...'
        value={source}
        onChange={e => setSource(e.target.value)}
        disabled={isUploading}
      />
      <select
        value={category}
        onChange={e => setCategory(e.target.value)}
        disabled={isUploading}
      >
        <option value=''>Choose category:</option>
        {CATEGORIES.map(cat => (
          <option key={cat.name} value={cat.name}>
            {cat.name[0].toUpperCase() + cat.name.slice(1)}
          </option>
        ))}
      </select>
      <button className='btn btn-large btn-post' type='submit' disabled={isUploading}>
        Post
      </button>
    </form>
  );
}
