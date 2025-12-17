import { useState, useCallback, useMemo } from 'react';
import { calculateDiff, getDiffStats } from '../utils';

const SAMPLE_TEXT1 = `if (param == ISCSI_PARAM_LOCAL_PORT)
    rc = kernel_getsockname(tcp_sw_conn->sock,
                (struct sockaddr *)&addr);
else
    rc = kernel_getpeername(tcp_sw_conn->sock,
                (struct sockaddr *)&addr);
spin_unlock_bh(&conn->session->frwd_lock);
if (rc < 0)
    return rc;`;

const SAMPLE_TEXT2 = `sock = tcp_sw_conn->sock;
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
    return rc;`;

export function useDiff() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [mode, setMode] = useState('characters'); // 'characters', 'words', 'lines'
  const [result, setResult] = useState([]);

  const compute = useCallback(() => {
    const diffResult = calculateDiff(text1, text2, mode);
    setResult(diffResult);
  }, [text1, text2, mode]);

  const loadSample = useCallback(() => {
    setText1(SAMPLE_TEXT1);
    setText2(SAMPLE_TEXT2);
  }, []);

  const swap = useCallback(() => {
    const temp = text1;
    setText1(text2);
    setText2(temp);
  }, [text1, text2]);

  const stats = useMemo(() => getDiffStats(result), [result]);

  const reset = useCallback(() => {
    setText1('');
    setText2('');
    setResult([]);
  }, []);

  return {
    text1,
    text2,
    mode,
    result,
    stats,
    setText1,
    setText2,
    setMode,
    compute,
    loadSample,
    swap,
    reset
  };
}
