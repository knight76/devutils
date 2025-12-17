import { useState, useCallback, useMemo } from 'react';
import React from 'react';

export function useRegex() {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [testText, setTestText] = useState('');
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState('');

  const test = useCallback(() => {
    try {
      if (!pattern) {
        setError('정규식 패턴을 입력하세요');
        setMatches([]);
        return;
      }

      const regex = new RegExp(pattern, flags);
      const foundMatches = [];
      let match;

      if (flags.includes('g')) {
        while ((match = regex.exec(testText)) !== null) {
          foundMatches.push({
            text: match[0],
            index: match.index,
            groups: match.slice(1)
          });
        }
      } else {
        match = regex.exec(testText);
        if (match) {
          foundMatches.push({
            text: match[0],
            index: match.index,
            groups: match.slice(1)
          });
        }
      }

      setMatches(foundMatches);
      setError('');
    } catch (e) {
      setError('정규식 오류: ' + e.message);
      setMatches([]);
    }
  }, [pattern, flags, testText]);

  const highlightedText = useMemo(() => {
    if (!testText || matches.length === 0) return testText;

    let result = [];
    let lastIndex = 0;

    matches.forEach((match, i) => {
      if (match.index > lastIndex) {
        result.push(
          React.createElement('span', { key: `text-${i}` },
            testText.substring(lastIndex, match.index)
          )
        );
      }
      result.push(
        React.createElement('span', {
          key: `match-${i}`,
          className: 'bg-green-300 text-green-900 font-semibold'
        }, match.text)
      );
      lastIndex = match.index + match.text.length;
    });

    if (lastIndex < testText.length) {
      result.push(
        React.createElement('span', { key: 'text-end' },
          testText.substring(lastIndex)
        )
      );
    }

    return result;
  }, [testText, matches]);

  const reset = useCallback(() => {
    setPattern('');
    setFlags('g');
    setTestText('');
    setMatches([]);
    setError('');
  }, []);

  return {
    pattern,
    flags,
    testText,
    matches,
    error,
    highlightedText,
    setPattern,
    setFlags,
    setTestText,
    test,
    reset
  };
}
