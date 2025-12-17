import { useState, useCallback } from 'react';

export function useURLEncoder() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const encode = useCallback(() => {
    try {
      const encoded = encodeURIComponent(input);
      setOutput(encoded);
    } catch (e) {
      setOutput('인코딩 오류');
    }
  }, [input]);

  const decode = useCallback(() => {
    try {
      const decoded = decodeURIComponent(input);
      setOutput(decoded);
    } catch (e) {
      setOutput('디코딩 오류: 유효하지 않은 URL 인코딩');
    }
  }, [input]);

  const reset = useCallback(() => {
    setInput('');
    setOutput('');
  }, []);

  return {
    input,
    output,
    setInput,
    encode,
    decode,
    reset
  };
}

export function useURLParser() {
  const [input, setInput] = useState('');
  const [parsed, setParsed] = useState(null);
  const [error, setError] = useState('');

  const parse = useCallback(() => {
    try {
      if (!input) {
        setError('URL을 입력하세요');
        setParsed(null);
        return;
      }

      const url = new URL(input);

      // Convert query params to object
      const queryParams = {};
      url.searchParams.forEach((value, key) => {
        if (queryParams[key]) {
          if (Array.isArray(queryParams[key])) {
            queryParams[key].push(value);
          } else {
            queryParams[key] = [queryParams[key], value];
          }
        } else {
          queryParams[key] = value;
        }
      });

      // Extract filename
      const pathParts = url.pathname.split('/');
      const fileName = pathParts[pathParts.length - 1] || '';

      setParsed({
        protocol: url.protocol.replace(':', ''),
        host: url.hostname,
        port: url.port,
        path: url.pathname,
        fileName: fileName,
        query: url.search.substring(1),
        queryParams: queryParams,
        hash: url.hash.substring(1),
        fullUrl: url.href
      });
      setError('');
    } catch (e) {
      setError('유효하지 않은 URL입니다: ' + e.message);
      setParsed(null);
    }
  }, [input]);

  const reset = useCallback(() => {
    setInput('');
    setParsed(null);
    setError('');
  }, []);

  return {
    input,
    parsed,
    error,
    setInput,
    parse,
    reset
  };
}
