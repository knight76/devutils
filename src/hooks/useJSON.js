import { useState, useCallback } from 'react';

export function useJSON() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const format = useCallback(() => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setError('');
    } catch (e) {
      setError('유효하지 않은 JSON: ' + e.message);
      setOutput('');
    }
  }, [input]);

  const minify = useCallback(() => {
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError('');
    } catch (e) {
      setError('유효하지 않은 JSON: ' + e.message);
      setOutput('');
    }
  }, [input]);

  const validate = useCallback(() => {
    try {
      JSON.parse(input);
      setError('');
      alert('✅ 유효한 JSON입니다!');
    } catch (e) {
      setError('❌ 유효하지 않은 JSON: ' + e.message);
    }
  }, [input]);

  const reset = useCallback(() => {
    setInput('');
    setOutput('');
    setError('');
  }, []);

  return {
    input,
    output,
    error,
    setInput,
    format,
    minify,
    validate,
    reset
  };
}
