import React, { useState, useEffect } from 'react';
import { Clock, Calendar, Code2, ArrowRightLeft, Menu, X } from 'lucide-react';

export default function EpochConverter() {
  const [activeTab, setActiveTab] = useState('timestamp');
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentEpoch, setCurrentEpoch] = useState(Math.floor(Date.now() / 1000));
  const [epochInput, setEpochInput] = useState('');
  const [humanDate, setHumanDate] = useState('');
  const [dateInput, setDateInput] = useState('');
  const [timeInput, setTimeInput] = useState('');
  const [epochResult, setEpochResult] = useState('');
  
  // Base64 states
  const [base64Input, setBase64Input] = useState('');
  const [base64Output, setBase64Output] = useState('');
  const [base64Mode, setBase64Mode] = useState('text'); // 'text' or 'image'
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [decodedImage, setDecodedImage] = useState('');
  
  // JSON states
  const [jsonInput, setJsonInput] = useState('');
  const [jsonOutput, setJsonOutput] = useState('');
  const [jsonError, setJsonError] = useState('');
  
  // RegExp states
  const [regexPattern, setRegexPattern] = useState('');
  const [regexFlags, setRegexFlags] = useState('g');
  const [regexTestText, setRegexTestText] = useState('');
  const [regexMatches, setRegexMatches] = useState([]);
  const [regexError, setRegexError] = useState('');
  
  // URL states
  const [urlInput, setUrlInput] = useState('');
  const [urlOutput, setUrlOutput] = useState('');
  
  // URL Parser states
  const [parserInput, setParserInput] = useState('');
  const [parsedUrl, setParsedUrl] = useState(null);
  const [parserError, setParserError] = useState('');
  
  // HTML Preview states
  const [htmlInput, setHtmlInput] = useState('');
  const [htmlKey, setHtmlKey] = useState(0); // iframe 리프레시용
  
  // Diff states
  const [diffText1, setDiffText1] = useState('');
  const [diffText2, setDiffText2] = useState('');
  const [diffMode, setDiffMode] = useState('characters'); // 'characters', 'words', 'lines'
  const [diffResult, setDiffResult] = useState([]);
  
  // Cron states
  const [cronExpression, setCronExpression] = useState('');
  const [cronParsed, setCronParsed] = useState(null);
  const [cronError, setCronError] = useState('');
  
  // 현재 시간 업데이트
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEpoch(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Epoch를 사람이 읽을 수 있는 날짜로 변환
  const convertEpochToHuman = (epoch) => {
    try {
      const timestamp = parseInt(epoch);
      if (isNaN(timestamp)) return '';
      
      const date = new Date(timestamp * 1000);
      return date.toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Asia/Seoul'
      });
    } catch (e) {
      return '유효하지 않은 timestamp';
    }
  };

  // 날짜를 Epoch로 변환
  const convertDateToEpoch = () => {
    try {
      if (!dateInput) return;
      const dateTimeString = timeInput ? `${dateInput}T${timeInput}` : `${dateInput}T00:00`;
      const date = new Date(dateTimeString);
      const epoch = Math.floor(date.getTime() / 1000);
      setEpochResult(epoch.toString());
    } catch (e) {
      setEpochResult('유효하지 않은 날짜');
    }
  };

  // Epoch 입력 처리
  const handleEpochInput = (value) => {
    setEpochInput(value);
    if (value) {
      setHumanDate(convertEpochToHuman(value));
    } else {
      setHumanDate('');
    }
  };

  // Base64 Encoding
  const encodeBase64 = () => {
    try {
      const encoded = btoa(unescape(encodeURIComponent(base64Input)));
      setBase64Output(encoded);
    } catch (e) {
      setBase64Output('인코딩 오류');
    }
  };

  // Base64 Decoding
  const decodeBase64 = () => {
    try {
      const decoded = decodeURIComponent(escape(atob(base64Input)));
      setBase64Output(decoded);
    } catch (e) {
      setBase64Output('디코딩 오류: 유효하지 않은 Base64');
    }
  };

  // 이미지 파일 선택 처리
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setBase64Output(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Base64를 이미지로 디코딩
  const decodeBase64ToImage = () => {
    try {
      // base64 문자열이 data URL 형식인지 확인
      if (base64Input.startsWith('data:image')) {
        setDecodedImage(base64Input);
      } else {
        // 순수 base64만 입력된 경우 data URL로 변환
        setDecodedImage(`data:image/png;base64,${base64Input}`);
      }
    } catch (e) {
      alert('유효하지 않은 이미지 Base64입니다.');
    }
  };

  // 탭 전환 시 초기화
  const switchTab = (tab) => {
    setActiveTab(tab);
    setBase64Input('');
    setBase64Output('');
    setImageFile(null);
    setImagePreview('');
    setDecodedImage('');
    setJsonInput('');
    setJsonOutput('');
    setJsonError('');
    setRegexPattern('');
    setRegexFlags('g');
    setRegexTestText('');
    setRegexMatches([]);
    setRegexError('');
    setUrlInput('');
    setUrlOutput('');
    setParserInput('');
    setParsedUrl(null);
    setParserError('');
    // HTML은 초기화하지 않음 (사용자가 작성 중일 수 있음)
  };

  // JSON 포맷팅
  const formatJSON = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      const formatted = JSON.stringify(parsed, null, 2);
      setJsonOutput(formatted);
      setJsonError('');
    } catch (e) {
      setJsonError('유효하지 않은 JSON: ' + e.message);
      setJsonOutput('');
    }
  };

  // JSON 압축 (Minify)
  const minifyJSON = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      const minified = JSON.stringify(parsed);
      setJsonOutput(minified);
      setJsonError('');
    } catch (e) {
      setJsonError('유효하지 않은 JSON: ' + e.message);
      setJsonOutput('');
    }
  };

  // JSON 검증
  const validateJSON = () => {
    try {
      JSON.parse(jsonInput);
      setJsonError('');
      alert('✅ 유효한 JSON입니다!');
    } catch (e) {
      setJsonError('❌ 유효하지 않은 JSON: ' + e.message);
    }
  };

  // RegExp 테스트
  const testRegex = () => {
    try {
      if (!regexPattern) {
        setRegexError('정규식 패턴을 입력하세요');
        setRegexMatches([]);
        return;
      }

      const regex = new RegExp(regexPattern, regexFlags);
      const matches = [];
      let match;

      if (regexFlags.includes('g')) {
        while ((match = regex.exec(regexTestText)) !== null) {
          matches.push({
            text: match[0],
            index: match.index,
            groups: match.slice(1)
          });
        }
      } else {
        match = regex.exec(regexTestText);
        if (match) {
          matches.push({
            text: match[0],
            index: match.index,
            groups: match.slice(1)
          });
        }
      }

      setRegexMatches(matches);
      setRegexError('');
    } catch (e) {
      setRegexError('정규식 오류: ' + e.message);
      setRegexMatches([]);
    }
  };

  // 텍스트에서 매치 하이라이트
  const highlightMatches = () => {
    if (!regexTestText || regexMatches.length === 0) return regexTestText;

    let result = [];
    let lastIndex = 0;

    regexMatches.forEach((match, i) => {
      // 매치 전 텍스트
      if (match.index > lastIndex) {
        result.push(
          <span key={`text-${i}`}>
            {regexTestText.substring(lastIndex, match.index)}
          </span>
        );
      }
      // 매치된 텍스트 (하이라이트)
      result.push(
        <span key={`match-${i}`} className="bg-green-300 text-green-900 font-semibold">
          {match.text}
        </span>
      );
      lastIndex = match.index + match.text.length;
    });

    // 마지막 매치 후 남은 텍스트
    if (lastIndex < regexTestText.length) {
      result.push(
        <span key="text-end">
          {regexTestText.substring(lastIndex)}
        </span>
      );
    }

    return result;
  };

  // URL 인코딩
  const encodeURL = () => {
    try {
      const encoded = encodeURIComponent(urlInput);
      setUrlOutput(encoded);
    } catch (e) {
      setUrlOutput('인코딩 오류');
    }
  };

  // URL 디코딩
  const decodeURL = () => {
    try {
      const decoded = decodeURIComponent(urlInput);
      setUrlOutput(decoded);
    } catch (e) {
      setUrlOutput('디코딩 오류: 유효하지 않은 URL 인코딩');
    }
  };

  // URL 파싱
  const parseURL = () => {
    try {
      if (!parserInput) {
        setParserError('URL을 입력하세요');
        setParsedUrl(null);
        return;
      }

      const url = new URL(parserInput);
      
      // Query 파라미터를 객체로 변환
      const queryParams = {};
      url.searchParams.forEach((value, key) => {
        if (queryParams[key]) {
          // 같은 키가 여러 개 있으면 배열로
          if (Array.isArray(queryParams[key])) {
            queryParams[key].push(value);
          } else {
            queryParams[key] = [queryParams[key], value];
          }
        } else {
          queryParams[key] = value;
        }
      });

      // 파일명 추출
      const pathParts = url.pathname.split('/');
      const fileName = pathParts[pathParts.length - 1] || '';

      setParsedUrl({
        protocol: url.protocol.replace(':', ''),
        host: url.hostname,
        port: url.port,
        path: url.pathname,
        fileName: fileName,
        query: url.search.substring(1), // ? 제거
        queryParams: queryParams,
        hash: url.hash.substring(1), // # 제거
        fullUrl: url.href
      });
      setParserError('');
    } catch (e) {
      setParserError('유효하지 않은 URL입니다: ' + e.message);
      setParsedUrl(null);
    }
  };

  // HTML Preview 업데이트
  const updatePreview = () => {
    setHtmlKey(prev => prev + 1); // iframe 강제 새로고침
  };

  // HTML 샘플 로드
  const loadHtmlSample = () => {
    setHtmlInput(`<!DOCTYPE html>
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
</html>`);
    setHtmlKey(prev => prev + 1);
  };

  // Diff 계산 (간단한 LCS 기반)
  const calculateDiff = () => {
    let arr1, arr2;
    
    if (diffMode === 'characters') {
      arr1 = diffText1.split('');
      arr2 = diffText2.split('');
    } else if (diffMode === 'words') {
      arr1 = diffText1.split(/\s+/);
      arr2 = diffText2.split(/\s+/);
    } else { // lines
      arr1 = diffText1.split('\n');
      arr2 = diffText2.split('\n');
    }

    const result = [];
    let i = 0, j = 0;

    while (i < arr1.length || j < arr2.length) {
      if (i >= arr1.length) {
        // 텍스트2에만 있음 (추가)
        result.push({ type: 'added', value: arr2[j] });
        j++;
      } else if (j >= arr2.length) {
        // 텍스트1에만 있음 (삭제)
        result.push({ type: 'removed', value: arr1[i] });
        i++;
      } else if (arr1[i] === arr2[j]) {
        // 동일
        result.push({ type: 'equal', value: arr1[i] });
        i++;
        j++;
      } else {
        // 다름 - 간단한 휴리스틱: 앞으로 찾아보기
        let foundInText2 = -1;
        let foundInText1 = -1;
        
        for (let k = j + 1; k < Math.min(j + 5, arr2.length); k++) {
          if (arr1[i] === arr2[k]) {
            foundInText2 = k;
            break;
          }
        }
        
        for (let k = i + 1; k < Math.min(i + 5, arr1.length); k++) {
          if (arr1[k] === arr2[j]) {
            foundInText1 = k;
            break;
          }
        }

        if (foundInText2 !== -1 && (foundInText1 === -1 || foundInText2 - j < foundInText1 - i)) {
          // 텍스트2에 추가된 것으로 처리
          result.push({ type: 'added', value: arr2[j] });
          j++;
        } else if (foundInText1 !== -1) {
          // 텍스트1에서 삭제된 것으로 처리
          result.push({ type: 'removed', value: arr1[i] });
          i++;
        } else {
          // 변경된 것으로 처리
          result.push({ type: 'removed', value: arr1[i] });
          result.push({ type: 'added', value: arr2[j] });
          i++;
          j++;
        }
      }
    }

    setDiffResult(result);
  };

  // Diff 샘플 로드
  const loadDiffSample = () => {
    setDiffText1(`if (param == ISCSI_PARAM_LOCAL_PORT)
    rc = kernel_getsockname(tcp_sw_conn->sock,
                (struct sockaddr *)&addr);
else
    rc = kernel_getpeername(tcp_sw_conn->sock,
                (struct sockaddr *)&addr);
spin_unlock_bh(&conn->session->frwd_lock);
if (rc < 0)
    return rc;`);
    
    setDiffText2(`sock = tcp_sw_conn->sock;
sock_hold(sock->sk);
spin_unlock_bh(&conn->session->frwd_lock);

if (param == ISCSI_PARAM_LOCAL_PORT)
    rc = kernel_getsockname(sock,
                (struct sockaddr *)&addr);
else
    rc2 = kernel_getpeername(sock,
                (struct sockaddr *)&addr);
sock_put(sock->sk);
if (rc < 0)
    return rc;`);
    
    calculateDiff();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* 상단 네비게이션 바 */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Clock className="w-6 h-6 text-indigo-600" />
              <span className="text-xl font-bold text-gray-800">DevTools</span>
            </div>
            
            {/* 데스크톱 메뉴 */}
            <div className="hidden lg:flex gap-1 overflow-x-auto">
              <button
                onClick={() => switchTab('timestamp')}
                className={`px-2 py-2 rounded-lg font-medium transition-colors text-xs whitespace-nowrap ${
                  activeTab === 'timestamp'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Timestamp
              </button>
              <button
                onClick={() => switchTab('base64')}
                className={`px-2 py-2 rounded-lg font-medium transition-colors text-xs whitespace-nowrap ${
                  activeTab === 'base64'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Base64
              </button>
              <button
                onClick={() => switchTab('json')}
                className={`px-2 py-2 rounded-lg font-medium transition-colors text-xs whitespace-nowrap ${
                  activeTab === 'json'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                JSON
              </button>
              <button
                onClick={() => switchTab('regex')}
                className={`px-2 py-2 rounded-lg font-medium transition-colors text-xs whitespace-nowrap ${
                  activeTab === 'regex'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                RegExp
              </button>
              <button
                onClick={() => switchTab('url')}
                className={`px-2 py-2 rounded-lg font-medium transition-colors text-xs whitespace-nowrap ${
                  activeTab === 'url'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                URL Encode
              </button>
              <button
                onClick={() => switchTab('parser')}
                className={`px-2 py-2 rounded-lg font-medium transition-colors text-xs whitespace-nowrap ${
                  activeTab === 'parser'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                URL Parser
              </button>
              <button
                onClick={() => switchTab('html')}
                className={`px-2 py-2 rounded-lg font-medium transition-colors text-xs whitespace-nowrap ${
                  activeTab === 'html'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                HTML
              </button>
              <button
                onClick={() => switchTab('diff')}
                className={`px-2 py-2 rounded-lg font-medium transition-colors text-xs whitespace-nowrap ${
                  activeTab === 'diff'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Diff
              </button>
            </div>
            
            {/* 모바일 메뉴 버튼 */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          
          {/* 모바일 메뉴 드롭다운 */}
          {menuOpen && (
            <div className="lg:hidden pb-4 space-y-2">
              <button
                onClick={() => {
                  switchTab('timestamp');
                  setMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === 'timestamp'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Timestamp Converter
              </button>
              <button
                onClick={() => {
                  switchTab('base64');
                  setMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === 'base64'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Base64 Encoder/Decoder
              </button>
              <button
                onClick={() => {
                  switchTab('json');
                  setMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === 'json'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                JSON Formatter
              </button>
              <button
                onClick={() => {
                  switchTab('regex');
                  setMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === 'regex'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                RegExp Tester
              </button>
              <button
                onClick={() => {
                  switchTab('url');
                  setMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === 'url'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                URL Encoder/Decoder
              </button>
              <button
                onClick={() => {
                  switchTab('parser');
                  setMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === 'parser'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                URL Parser
              </button>
              <button
                onClick={() => {
                  switchTab('html');
                  setMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === 'html'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                HTML Preview
              </button>
              <button
                onClick={() => {
                  switchTab('diff');
                  setMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === 'diff'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Text Diff Checker
              </button>
            </div>
          )}
        </div>
      </nav>

      <div className="p-4">
        <div className="max-w-2xl mx-auto space-y-4">
          
          {/* Timestamp 탭 */}
          {activeTab === 'timestamp' && (
            <>
              {/* 헤더 */}
              <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Clock className="w-8 h-8 text-indigo-600" />
                  <h1 className="text-3xl font-bold text-gray-800">Epoch Converter</h1>
                </div>
                <p className="text-gray-600">Unix Timestamp 변환 도구</p>
              </div>

        {/* 현재 Epoch 시간 */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5" />
            <h2 className="text-lg font-semibold">현재 Epoch 시간</h2>
          </div>
          <div className="text-4xl font-mono font-bold mb-2">{currentEpoch}</div>
          <div className="text-sm opacity-90">{convertEpochToHuman(currentEpoch)}</div>
        </div>

        {/* Epoch → 사람이 읽을 수 있는 날짜 */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <ArrowRightLeft className="w-5 h-5 text-indigo-600" />
            <h2 className="text-xl font-semibold text-gray-800">Epoch → 날짜 변환</h2>
          </div>
          
          <input
            type="text"
            value={epochInput}
            onChange={(e) => handleEpochInput(e.target.value)}
            placeholder="Epoch timestamp 입력 (예: 1732604225)"
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none text-lg mb-3"
          />
          
          {humanDate && (
            <div className="bg-indigo-50 rounded-xl p-4">
              <div className="text-sm text-gray-600 mb-1">변환 결과:</div>
              <div className="text-xl font-semibold text-indigo-700">{humanDate}</div>
            </div>
          )}
        </div>

        {/* 날짜 → Epoch */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-indigo-600" />
            <h2 className="text-xl font-semibold text-gray-800">날짜 → Epoch 변환</h2>
          </div>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-600 mb-1">날짜</label>
              <input
                type="date"
                value={dateInput}
                onChange={(e) => setDateInput(e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none text-lg"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-600 mb-1">시간 (선택)</label>
              <input
                type="time"
                value={timeInput}
                onChange={(e) => setTimeInput(e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none text-lg"
              />
            </div>
            
            <button
              onClick={convertDateToEpoch}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 rounded-xl transition-colors"
            >
              변환하기
            </button>
            
            {epochResult && (
              <div className="bg-indigo-50 rounded-xl p-4">
                <div className="text-sm text-gray-600 mb-1">Epoch 결과:</div>
                <div className="text-2xl font-mono font-bold text-indigo-700">{epochResult}</div>
              </div>
            )}
          </div>
        </div>

        {/* 시간 단위 변환 참고 */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Code2 className="w-5 h-5 text-indigo-600" />
            <h2 className="text-xl font-semibold text-gray-800">시간 단위 변환</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-gray-600">1초</div>
              <div className="font-semibold">1000 밀리초</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-gray-600">1분</div>
              <div className="font-semibold">60초</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-gray-600">1시간</div>
              <div className="font-semibold">3600초</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-gray-600">1일</div>
              <div className="font-semibold">86400초</div>
            </div>
          </div>
        </div>

        {/* What is Epoch time? */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Epoch time이란?</h2>
          <p className="text-gray-600 leading-relaxed">
            Unix Epoch time은 1970년 1월 1일 00:00:00 UTC부터 경과한 초를 나타냅니다. 
            전 세계 컴퓨터 시스템에서 날짜와 시간을 표현하는 표준 방식으로 사용됩니다.
          </p>
        </div>
        </>
          )}

          {/* Base64 탭 */}
          {activeTab === 'base64' && (
            <>
              {/* 헤더 */}
              <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Code2 className="w-8 h-8 text-indigo-600" />
                  <h1 className="text-3xl font-bold text-gray-800">Base64 Converter</h1>
                </div>
                <p className="text-gray-600">텍스트 & 이미지 인코딩/디코딩 도구</p>
              </div>

              {/* 모드 선택 */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setBase64Mode('text');
                      setBase64Input('');
                      setBase64Output('');
                      setImageFile(null);
                      setImagePreview('');
                      setDecodedImage('');
                    }}
                    className={`flex-1 py-3 rounded-xl font-semibold transition-colors ${
                      base64Mode === 'text'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    텍스트
                  </button>
                  <button
                    onClick={() => {
                      setBase64Mode('image');
                      setBase64Input('');
                      setBase64Output('');
                      setImageFile(null);
                      setImagePreview('');
                      setDecodedImage('');
                    }}
                    className={`flex-1 py-3 rounded-xl font-semibold transition-colors ${
                      base64Mode === 'image'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    이미지
                  </button>
                </div>
              </div>

              {/* 텍스트 모드 */}
              {base64Mode === 'text' && (
                <>
                  {/* 입력 영역 */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <label className="block text-lg font-semibold text-gray-800 mb-3">
                      입력 텍스트
                    </label>
                    <textarea
                      value={base64Input}
                      onChange={(e) => setBase64Input(e.target.value)}
                      placeholder="인코딩하거나 디코딩할 텍스트를 입력하세요..."
                      className="w-full h-32 p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none resize-none"
                    />
                    
                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={encodeBase64}
                        className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 rounded-xl transition-colors"
                      >
                        인코딩
                      </button>
                      <button
                        onClick={decodeBase64}
                        className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 rounded-xl transition-colors"
                      >
                        디코딩
                      </button>
                    </div>
                  </div>

                  {/* 출력 영역 */}
                  {base64Output && (
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                      <label className="block text-lg font-semibold text-gray-800 mb-3">
                        결과
                      </label>
                      <div className="bg-gray-50 rounded-xl p-4 break-all font-mono text-sm max-h-64 overflow-y-auto">
                        {base64Output}
                      </div>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(base64Output);
                          alert('복사되었습니다!');
                        }}
                        className="w-full mt-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 rounded-xl transition-colors"
                      >
                        클립보드에 복사
                      </button>
                    </div>
                  )}
                </>
              )}

              {/* 이미지 모드 */}
              {base64Mode === 'image' && (
                <>
                  {/* 이미지 인코딩 */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <label className="block text-lg font-semibold text-gray-800 mb-3">
                      이미지 → Base64 인코딩
                    </label>
                    
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-indigo-500 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="cursor-pointer"
                      >
                        <div className="text-gray-600">
                          <div className="text-4xl mb-2">📁</div>
                          <div className="font-semibold">이미지 선택</div>
                          <div className="text-sm mt-1">클릭하거나 드래그하여 업로드</div>
                        </div>
                      </label>
                    </div>

                    {imagePreview && (
                      <div className="mt-4">
                        <div className="text-sm text-gray-600 mb-2">미리보기:</div>
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="max-w-full max-h-64 mx-auto rounded-lg shadow-md"
                        />
                      </div>
                    )}
                  </div>

                  {/* Base64 출력 */}
                  {base64Output && imageFile && (
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                      <label className="block text-lg font-semibold text-gray-800 mb-3">
                        Base64 결과
                      </label>
                      <div className="bg-gray-50 rounded-xl p-4 break-all font-mono text-xs max-h-64 overflow-y-auto">
                        {base64Output}
                      </div>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(base64Output);
                          alert('복사되었습니다!');
                        }}
                        className="w-full mt-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 rounded-xl transition-colors"
                      >
                        클립보드에 복사
                      </button>
                    </div>
                  )}

                  {/* Base64 디코딩 */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <label className="block text-lg font-semibold text-gray-800 mb-3">
                      Base64 → 이미지 디코딩
                    </label>
                    <textarea
                      value={base64Input}
                      onChange={(e) => setBase64Input(e.target.value)}
                      placeholder="Base64 문자열을 입력하세요..."
                      className="w-full h-32 p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none resize-none font-mono text-sm"
                    />
                    
                    <button
                      onClick={decodeBase64ToImage}
                      className="w-full mt-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 rounded-xl transition-colors"
                    >
                      이미지로 변환
                    </button>
                  </div>

                  {/* 디코딩된 이미지 표시 */}
                  {decodedImage && (
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                      <label className="block text-lg font-semibold text-gray-800 mb-3">
                        디코딩된 이미지
                      </label>
                      <img
                        src={decodedImage}
                        alt="Decoded"
                        className="max-w-full max-h-96 mx-auto rounded-lg shadow-md"
                      />
                    </div>
                  )}
                </>
              )}

              {/* Base64란? */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Base64란?</h2>
                <p className="text-gray-600 leading-relaxed mb-3">
                  Base64는 바이너리 데이터를 텍스트로 인코딩하는 방식입니다. 
                  이메일이나 URL에서 바이너리 데이터를 안전하게 전송할 때 사용됩니다.
                </p>
                <div className="bg-indigo-50 rounded-lg p-4">
                  <div className="text-sm text-gray-700">
                    <div className="mb-2"><strong>예시:</strong></div>
                    <div className="font-mono text-xs">
                      <div>텍스트: Hello World</div>
                      <div className="text-indigo-600">Base64: SGVsbG8gV29ybGQ=</div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* JSON 탭 */}
          {activeTab === 'json' && (
            <>
              {/* 헤더 */}
              <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Code2 className="w-8 h-8 text-indigo-600" />
                  <h1 className="text-3xl font-bold text-gray-800">JSON Formatter</h1>
                </div>
                <p className="text-gray-600">JSON 포맷팅 & 검증 도구</p>
              </div>

              {/* 입력 영역 */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <label className="block text-lg font-semibold text-gray-800 mb-3">
                  JSON 입력
                </label>
                <textarea
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  placeholder='{"name": "홍길동", "age": 30, "city": "서울"}'
                  className="w-full h-64 p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none resize-none font-mono text-sm"
                />
                
                {jsonError && (
                  <div className="mt-3 bg-red-50 border-2 border-red-200 rounded-xl p-4 text-red-700">
                    {jsonError}
                  </div>
                )}

                <div className="grid grid-cols-3 gap-3 mt-4">
                  <button
                    onClick={formatJSON}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-colors"
                  >
                    포맷팅
                  </button>
                  <button
                    onClick={minifyJSON}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition-colors"
                  >
                    압축
                  </button>
                  <button
                    onClick={validateJSON}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-colors"
                  >
                    검증
                  </button>
                </div>
              </div>

              {/* 출력 영역 */}
              {jsonOutput && (
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <label className="block text-lg font-semibold text-gray-800 mb-3">
                    결과
                  </label>
                  <div className="bg-gray-50 rounded-xl p-4 font-mono text-sm max-h-96 overflow-y-auto whitespace-pre">
                    {jsonOutput}
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(jsonOutput);
                      alert('복사되었습니다!');
                    }}
                    className="w-full mt-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 rounded-xl transition-colors"
                  >
                    클립보드에 복사
                  </button>
                </div>
              )}

              {/* JSON 가이드 */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">사용법</h2>
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold">•</span>
                    <span><strong>포맷팅:</strong> JSON을 읽기 쉽게 정리합니다</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span><strong>압축:</strong> 공백을 제거하여 최소화합니다</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span><strong>검증:</strong> JSON 문법이 올바른지 확인합니다</span>
                  </div>
                </div>
                
                <div className="mt-4 bg-indigo-50 rounded-lg p-4">
                  <div className="text-sm text-gray-700">
                    <div className="font-semibold mb-2">예시:</div>
                    <div className="font-mono text-xs bg-white p-3 rounded">
                      {`{"name":"홍길동","age":30,"hobbies":["독서","운동"]}`}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* RegExp 탭 */}
          {activeTab === 'regex' && (
            <>
              {/* 헤더 */}
              <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Code2 className="w-8 h-8 text-indigo-600" />
                  <h1 className="text-3xl font-bold text-gray-800">RegExp Tester</h1>
                </div>
                <p className="text-gray-600">정규식 테스트 & 매칭 도구</p>
              </div>

              {/* 정규식 입력 */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <label className="block text-lg font-semibold text-gray-800 mb-3">
                  정규식 패턴
                </label>
                <div className="flex gap-2">
                  <span className="text-2xl text-gray-400">/</span>
                  <input
                    type="text"
                    value={regexPattern}
                    onChange={(e) => setRegexPattern(e.target.value)}
                    placeholder="[A-Z]\w+"
                    className="flex-1 p-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none font-mono"
                  />
                  <span className="text-2xl text-gray-400">/</span>
                  <input
                    type="text"
                    value={regexFlags}
                    onChange={(e) => setRegexFlags(e.target.value)}
                    placeholder="g"
                    className="w-20 p-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none font-mono text-center"
                  />
                </div>
                
                <div className="mt-3 text-sm text-gray-600">
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-gray-100 px-2 py-1 rounded">g: 전역 검색</span>
                    <span className="bg-gray-100 px-2 py-1 rounded">i: 대소문자 무시</span>
                    <span className="bg-gray-100 px-2 py-1 rounded">m: 다중행</span>
                  </div>
                </div>
              </div>

              {/* 테스트 텍스트 */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <label className="block text-lg font-semibold text-gray-800 mb-3">
                  테스트 텍스트
                </label>
                <textarea
                  value={regexTestText}
                  onChange={(e) => setRegexTestText(e.target.value)}
                  placeholder="테스트할 텍스트를 입력하세요..."
                  className="w-full h-32 p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none resize-none"
                />
                
                {regexError && (
                  <div className="mt-3 bg-red-50 border-2 border-red-200 rounded-xl p-4 text-red-700 text-sm">
                    {regexError}
                  </div>
                )}

                <button
                  onClick={testRegex}
                  className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 rounded-xl transition-colors"
                >
                  테스트 실행
                </button>
              </div>

              {/* 매치 결과 */}
              {regexMatches.length > 0 && (
                <>
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-lg font-semibold text-gray-800">
                        매치 결과
                      </label>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                        {regexMatches.length}개 매치
                      </span>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 whitespace-pre-wrap break-words">
                      {highlightMatches()}
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <label className="block text-lg font-semibold text-gray-800 mb-3">
                      상세 정보
                    </label>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {regexMatches.map((match, i) => (
                        <div key={i} className="bg-gray-50 rounded-lg p-3 text-sm">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="bg-indigo-600 text-white px-2 py-0.5 rounded text-xs font-semibold">
                              #{i + 1}
                            </span>
                            <span className="font-mono font-semibold text-green-700">
                              "{match.text}"
                            </span>
                          </div>
                          <div className="text-gray-600">
                            위치: {match.index} ~ {match.index + match.text.length}
                          </div>
                          {match.groups.length > 0 && (
                            <div className="text-gray-600 mt-1">
                              그룹: {match.groups.join(', ')}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {regexMatches.length === 0 && regexTestText && !regexError && regexPattern && (
                <div className="bg-white rounded-2xl shadow-lg p-6 text-center text-gray-500">
                  매치되는 항목이 없습니다
                </div>
              )}

              {/* 정규식 치트시트 */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">정규식 치트시트</h2>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-gray-50 rounded-lg p-2">
                    <span className="font-mono text-indigo-600">\d</span> 숫자
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2">
                    <span className="font-mono text-indigo-600">\w</span> 단어 문자
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2">
                    <span className="font-mono text-indigo-600">\s</span> 공백
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2">
                    <span className="font-mono text-indigo-600">.</span> 모든 문자
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2">
                    <span className="font-mono text-indigo-600">*</span> 0회 이상
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2">
                    <span className="font-mono text-indigo-600">+</span> 1회 이상
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2">
                    <span className="font-mono text-indigo-600">?</span> 0 또는 1회
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2">
                    <span className="font-mono text-indigo-600">^</span> 시작
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2">
                    <span className="font-mono text-indigo-600">$</span> 끝
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2">
                    <span className="font-mono text-indigo-600">[ ]</span> 문자 클래스
                  </div>
                </div>
              </div>
            </>
          )}

          {/* URL 탭 */}
          {activeTab === 'url' && (
            <>
              {/* 헤더 */}
              <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Code2 className="w-8 h-8 text-indigo-600" />
                  <h1 className="text-3xl font-bold text-gray-800">URL Encoder/Decoder</h1>
                </div>
                <p className="text-gray-600">URL 인코딩/디코딩 도구</p>
              </div>

              {/* 입력 영역 */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <label className="block text-lg font-semibold text-gray-800 mb-3">
                  입력
                </label>
                <textarea
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="인코딩하거나 디코딩할 URL 또는 텍스트를 입력하세요..."
                  className="w-full h-32 p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none resize-none"
                />
                
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={encodeURL}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 rounded-xl transition-colors"
                  >
                    인코딩
                  </button>
                  <button
                    onClick={decodeURL}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 rounded-xl transition-colors"
                  >
                    디코딩
                  </button>
                </div>
              </div>

              {/* 출력 영역 */}
              {urlOutput && (
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <label className="block text-lg font-semibold text-gray-800 mb-3">
                    결과
                  </label>
                  <div className="bg-gray-50 rounded-xl p-4 break-all font-mono text-sm max-h-64 overflow-y-auto">
                    {urlOutput}
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(urlOutput);
                      alert('복사되었습니다!');
                    }}
                    className="w-full mt-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 rounded-xl transition-colors"
                  >
                    클립보드에 복사
                  </button>
                </div>
              )}

              {/* URL 인코딩 가이드 */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">URL 인코딩이란?</h2>
                <p className="text-gray-600 leading-relaxed mb-3">
                  URL에서 사용할 수 없는 특수문자를 안전하게 전송하기 위해 퍼센트 인코딩(% 인코딩)으로 변환합니다.
                </p>
                
                <div className="bg-indigo-50 rounded-lg p-4">
                  <div className="text-sm text-gray-700">
                    <div className="font-semibold mb-2">변환 예시:</div>
                    <div className="space-y-2 font-mono text-xs">
                      <div className="flex justify-between">
                        <span>공백 ( )</span>
                        <span className="text-indigo-600">→ %20</span>
                      </div>
                      <div className="flex justify-between">
                        <span>느낌표 (!)</span>
                        <span className="text-indigo-600">→ %21</span>
                      </div>
                      <div className="flex justify-between">
                        <span>한글 (가)</span>
                        <span className="text-indigo-600">→ %EA%B0%80</span>
                      </div>
                      <div className="flex justify-between">
                        <span>앰퍼샌드 (&)</span>
                        <span className="text-indigo-600">→ %26</span>
                      </div>
                      <div className="flex justify-between">
                        <span>더하기 (+)</span>
                        <span className="text-indigo-600">→ %2B</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 bg-green-50 rounded-lg p-4">
                  <div className="text-sm text-gray-700">
                    <div className="font-semibold mb-2">사용 예:</div>
                    <div className="font-mono text-xs bg-white p-3 rounded space-y-1">
                      <div className="text-gray-500">원본:</div>
                      <div className="mb-2">https://example.com?name=홍길동&age=30</div>
                      <div className="text-gray-500">인코딩:</div>
                      <div className="text-indigo-600 break-all">
                        https://example.com?name=%ED%99%8D%EA%B8%B8%EB%8F%99&age=30
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* URL Parser 탭 */}
          {activeTab === 'parser' && (
            <>
              {/* 헤더 */}
              <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Code2 className="w-8 h-8 text-indigo-600" />
                  <h1 className="text-3xl font-bold text-gray-800">URL Parser</h1>
                </div>
                <p className="text-gray-600">URL 구조 분석 도구</p>
              </div>

              {/* 입력 영역 */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <label className="block text-lg font-semibold text-gray-800 mb-3">
                  URL 입력
                </label>
                <textarea
                  value={parserInput}
                  onChange={(e) => setParserInput(e.target.value)}
                  placeholder="https://www.example.com/path?key=value"
                  className="w-full h-32 p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none resize-none"
                />
                
                {parserError && (
                  <div className="mt-3 bg-red-50 border-2 border-red-200 rounded-xl p-4 text-red-700 text-sm">
                    {parserError}
                  </div>
                )}

                <button
                  onClick={parseURL}
                  className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 rounded-xl transition-colors"
                >
                  파싱하기
                </button>
              </div>

              {/* 파싱 결과 - 기본 정보 */}
              {parsedUrl && (
                <>
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <label className="block text-lg font-semibold text-gray-800 mb-4">
                      기본 정보
                    </label>
                    <div className="space-y-3">
                      <div className="flex border-b border-gray-200 pb-3">
                        <div className="w-32 font-semibold text-gray-700">Protocol</div>
                        <div className="flex-1 font-mono text-indigo-600">{parsedUrl.protocol}</div>
                      </div>
                      <div className="flex border-b border-gray-200 pb-3">
                        <div className="w-32 font-semibold text-gray-700">Host</div>
                        <div className="flex-1 font-mono text-indigo-600">{parsedUrl.host}</div>
                      </div>
                      {parsedUrl.port && (
                        <div className="flex border-b border-gray-200 pb-3">
                          <div className="w-32 font-semibold text-gray-700">Port</div>
                          <div className="flex-1 font-mono text-indigo-600">{parsedUrl.port}</div>
                        </div>
                      )}
                      <div className="flex border-b border-gray-200 pb-3">
                        <div className="w-32 font-semibold text-gray-700">Path</div>
                        <div className="flex-1 font-mono text-indigo-600">{parsedUrl.path || '/'}</div>
                      </div>
                      {parsedUrl.fileName && (
                        <div className="flex border-b border-gray-200 pb-3">
                          <div className="w-32 font-semibold text-gray-700">File name</div>
                          <div className="flex-1 font-mono text-indigo-600">{parsedUrl.fileName}</div>
                        </div>
                      )}
                      {parsedUrl.query && (
                        <div className="flex border-b border-gray-200 pb-3">
                          <div className="w-32 font-semibold text-gray-700">Query</div>
                          <div className="flex-1 font-mono text-indigo-600 break-all">{parsedUrl.query}</div>
                        </div>
                      )}
                      {parsedUrl.hash && (
                        <div className="flex">
                          <div className="w-32 font-semibold text-gray-700">Hash</div>
                          <div className="flex-1 font-mono text-indigo-600">{parsedUrl.hash}</div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Query 파라미터 */}
                  {Object.keys(parsedUrl.queryParams).length > 0 && (
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <label className="text-lg font-semibold text-gray-800">
                          Query Parameters
                        </label>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(JSON.stringify(parsedUrl.queryParams, null, 2));
                            alert('JSON으로 복사되었습니다!');
                          }}
                          className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-lg transition-colors"
                        >
                          Copy as JSON
                        </button>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4 max-h-96 overflow-y-auto">
                        <div className="space-y-2">
                          {Object.entries(parsedUrl.queryParams).map(([key, value]) => (
                            <div key={key} className="bg-white rounded-lg p-3 border border-gray-200">
                              <div className="text-sm font-semibold text-gray-700 mb-1">{key}</div>
                              <div className="font-mono text-sm text-indigo-600 break-all">
                                {Array.isArray(value) ? JSON.stringify(value) : value}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* JSON 표현 */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-lg font-semibold text-gray-800">
                        Query String (JSON)
                      </label>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(JSON.stringify(parsedUrl.queryParams, null, 2));
                          alert('복사되었습니다!');
                        }}
                        className="text-sm bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded-lg transition-colors"
                      >
                        Copy
                      </button>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 font-mono text-sm whitespace-pre overflow-x-auto">
                      {JSON.stringify(parsedUrl.queryParams, null, 2)}
                    </div>
                  </div>
                </>
              )}

              {/* 가이드 */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">URL 구조</h2>
                <div className="bg-indigo-50 rounded-lg p-4 font-mono text-xs break-all">
                  <div className="mb-3 text-gray-700">
                    <span className="text-red-600">protocol</span>://
                    <span className="text-blue-600">host</span>
                    <span className="text-purple-600">:port</span>
                    <span className="text-green-600">/path</span>
                    <span className="text-orange-600">?query</span>
                    <span className="text-pink-600">#hash</span>
                  </div>
                  <div className="text-gray-600">
                    예시: <span className="text-red-600">https</span>://
                    <span className="text-blue-600">www.example.com</span>
                    <span className="text-purple-600">:443</span>
                    <span className="text-green-600">/search</span>
                    <span className="text-orange-600">?q=hello&lang=ko</span>
                    <span className="text-pink-600">#results</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* HTML Preview 탭 */}
          {activeTab === 'html' && (
            <>
              {/* 헤더 */}
              <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Code2 className="w-8 h-8 text-indigo-600" />
                  <h1 className="text-3xl font-bold text-gray-800">HTML Preview</h1>
                </div>
                <p className="text-gray-600">실시간 HTML 미리보기</p>
              </div>

              {/* 2열 레이아웃 */}
              <div className="grid lg:grid-cols-2 gap-4">
                {/* 왼쪽: HTML 입력 */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-lg font-semibold text-gray-800">
                      HTML 코드
                    </label>
                    <div className="flex gap-2">
                      <button
                        onClick={loadHtmlSample}
                        className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-lg transition-colors"
                      >
                        샘플
                      </button>
                      <button
                        onClick={() => {
                          setHtmlInput('');
                          setHtmlKey(prev => prev + 1);
                        }}
                        className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-lg transition-colors"
                      >
                        초기화
                      </button>
                    </div>
                  </div>
                  <textarea
                    value={htmlInput}
                    onChange={(e) => setHtmlInput(e.target.value)}
                    placeholder="<!DOCTYPE html>
<html>
<head>
  <title>My Page</title>
</head>
<body>
  <h1>Hello World!</h1>
</body>
</html>"
                    className="w-full h-[500px] p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none resize-none font-mono text-sm"
                  />
                  <button
                    onClick={updatePreview}
                    className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-colors"
                  >
                    미리보기 업데이트
                  </button>
                </div>

                {/* 오른쪽: 미리보기 */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <label className="block text-lg font-semibold text-gray-800 mb-3">
                    미리보기
                  </label>
                  <div className="border-2 border-gray-200 rounded-xl overflow-hidden bg-white">
                    {htmlInput ? (
                      <iframe
                        key={htmlKey}
                        srcDoc={htmlInput}
                        className="w-full h-[500px] border-0"
                        title="HTML Preview"
                        sandbox="allow-scripts"
                      />
                    ) : (
                      <div className="h-[500px] flex items-center justify-center text-gray-400">
                        HTML 코드를 입력하면 여기에 미리보기가 표시됩니다
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* 가이드 */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">사용 팁</h2>
                <div className="space-y-2 text-gray-600 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold">•</span>
                    <span>왼쪽에 HTML 코드를 입력하고 "미리보기 업데이트" 버튼을 클릭하세요</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold">•</span>
                    <span>HTML, CSS, JavaScript를 모두 사용할 수 있습니다</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold">•</span>
                    <span>"샘플" 버튼을 클릭하면 예제 코드를 볼 수 있습니다</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">⚠</span>
                    <span>보안상 일부 기능이 제한될 수 있습니다</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Diff 탭 */}
          {activeTab === 'diff' && (
            <>
              {/* 헤더 */}
              <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <ArrowRightLeft className="w-8 h-8 text-indigo-600" />
                  <h1 className="text-3xl font-bold text-gray-800">Text Diff Checker</h1>
                </div>
                <p className="text-gray-600">두 텍스트의 차이점 비교</p>
              </div>

              {/* Diff 모드 선택 */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Diff 모드
                </label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setDiffMode('characters')}
                    className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                      diffMode === 'characters'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    문자
                  </button>
                  <button
                    onClick={() => setDiffMode('words')}
                    className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                      diffMode === 'words'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    단어
                  </button>
                  <button
                    onClick={() => setDiffMode('lines')}
                    className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                      diffMode === 'lines'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    줄
                  </button>
                </div>
              </div>

              {/* 2열 입력 */}
              <div className="grid lg:grid-cols-2 gap-4">
                {/* 원본 텍스트 */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-lg font-semibold text-gray-800">
                      원본 텍스트
                    </label>
                    <button
                      onClick={() => {
                        navigator.clipboard.readText().then(text => setDiffText1(text));
                      }}
                      className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-lg transition-colors"
                    >
                      붙여넣기
                    </button>
                  </div>
                  <textarea
                    value={diffText1}
                    onChange={(e) => setDiffText1(e.target.value)}
                    placeholder="비교할 첫 번째 텍스트를 입력하세요..."
                    className="w-full h-64 p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none resize-none font-mono text-sm"
                  />
                </div>

                {/* 비교 텍스트 */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-lg font-semibold text-gray-800">
                      비교 텍스트
                    </label>
                    <button
                      onClick={() => {
                        const temp = diffText1;
                        setDiffText1(diffText2);
                        setDiffText2(temp);
                      }}
                      className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-lg transition-colors"
                    >
                      ⇄ 교체
                    </button>
                  </div>
                  <textarea
                    value={diffText2}
                    onChange={(e) => setDiffText2(e.target.value)}
                    placeholder="비교할 두 번째 텍스트를 입력하세요..."
                    className="w-full h-64 p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none resize-none font-mono text-sm"
                  />
                </div>
              </div>

              {/* 비교 버튼 */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex gap-3">
                  <button
                    onClick={calculateDiff}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 rounded-xl transition-colors"
                  >
                    차이점 비교
                  </button>
                  <button
                    onClick={loadDiffSample}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-6 py-4 rounded-xl transition-colors"
                  >
                    샘플 로드
                  </button>
                </div>
              </div>

              {/* Diff 결과 */}
              {diffResult.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-lg font-semibold text-gray-800">
                      비교 결과
                    </label>
                    <div className="flex gap-4 text-sm">
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 bg-green-200 rounded"></span>
                        추가
                      </span>
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 bg-red-200 rounded"></span>
                        삭제
                      </span>
                    </div>
                  </div>
                  <div className="bg-gray-900 rounded-xl p-4 overflow-x-auto max-h-96 overflow-y-auto">
                    <pre className="font-mono text-sm">
                      {diffResult.map((item, idx) => {
                        if (item.type === 'added') {
                          return (
                            <span key={idx} className="bg-green-600 text-white">
                              {item.value}
                              {diffMode === 'words' && ' '}
                              {diffMode === 'lines' && '\n'}
                            </span>
                          );
                        } else if (item.type === 'removed') {
                          return (
                            <span key={idx} className="bg-red-600 text-white line-through">
                              {item.value}
                              {diffMode === 'words' && ' '}
                              {diffMode === 'lines' && '\n'}
                            </span>
                          );
                        } else {
                          return (
                            <span key={idx} className="text-gray-300">
                              {item.value}
                              {diffMode === 'words' && ' '}
                              {diffMode === 'lines' && '\n'}
                            </span>
                          );
                        }
                      })}
                    </pre>
                  </div>
                </div>
              )}

              {/* 통계 */}
              {diffResult.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <label className="block text-lg font-semibold text-gray-800 mb-3">
                    통계
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-green-700">
                        {diffResult.filter(d => d.type === 'added').length}
                      </div>
                      <div className="text-sm text-gray-600">추가됨</div>
                    </div>
                    <div className="bg-red-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-red-700">
                        {diffResult.filter(d => d.type === 'removed').length}
                      </div>
                      <div className="text-sm text-gray-600">삭제됨</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-gray-700">
                        {diffResult.filter(d => d.type === 'equal').length}
                      </div>
                      <div className="text-sm text-gray-600">동일함</div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

        {/* 푸터 */}
        <div className="text-center text-gray-500 text-sm py-4">
          Made with ❤️ by Claude
        </div>
      </div>
      </div>
    </div>
  );
}
