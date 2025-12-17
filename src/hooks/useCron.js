import { useState, useCallback } from 'react';
import { parseCronExpression } from '../utils';

export function useCron() {
  const [expression, setExpression] = useState('');
  const [parsed, setParsed] = useState(null);
  const [error, setError] = useState('');

  const parse = useCallback(() => {
    try {
      const result = parseCronExpression(expression);
      setParsed(result);
      setError('');
    } catch (e) {
      setError(`파싱 오류: ${e.message}`);
      setParsed(null);
    }
  }, [expression]);

  const loadSample = useCallback((sampleExpression) => {
    setExpression(sampleExpression);
  }, []);

  const reset = useCallback(() => {
    setExpression('');
    setParsed(null);
    setError('');
  }, []);

  return {
    expression,
    parsed,
    error,
    setExpression,
    parse,
    loadSample,
    reset
  };
}
