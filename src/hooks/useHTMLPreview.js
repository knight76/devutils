import { useState, useCallback } from 'react';

const SAMPLE_HTML = `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }
    .container {
      background: white;
      color: #333;
      padding: 30px;
      border-radius: 15px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    }
    h1 { color: #667eea; }
    button {
      background: #667eea;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
    }
    button:hover { background: #764ba2; }
  </style>
</head>
<body>
  <div class="container">
    <h1>🎨 Hello from DevUtils.app!</h1>
    <p>이것은 샘플 HTML 페이지입니다.</p>
    <button onclick="alert('안녕하세요!')">클릭해보세요!</button>
  </div>
</body>
</html>`;

export function useHTMLPreview() {
  const [input, setInput] = useState('');
  const [key, setKey] = useState(0);

  const refresh = useCallback(() => {
    setKey(prev => prev + 1);
  }, []);

  const loadSample = useCallback(() => {
    setInput(SAMPLE_HTML);
    setKey(prev => prev + 1);
  }, []);

  const clear = useCallback(() => {
    setInput('');
    setKey(prev => prev + 1);
  }, []);

  return {
    input,
    key,
    setInput,
    refresh,
    loadSample,
    clear
  };
}
