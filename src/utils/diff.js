// LCS (Longest Common Subsequence) based Diff Algorithm
export function calculateDiff(text1, text2, mode = 'characters') {
  let arr1, arr2;

  if (mode === 'characters') {
    arr1 = text1.split('');
    arr2 = text2.split('');
  } else if (mode === 'words') {
    arr1 = text1.split(/(\s+)/).filter(s => s.length > 0);
    arr2 = text2.split(/(\s+)/).filter(s => s.length > 0);
  } else { // lines
    arr1 = text1.split('\n');
    arr2 = text2.split('\n');
  }

  const m = arr1.length;
  const n = arr2.length;

  // Optimize for large inputs: use Map for sparse storage
  const useSparse = m * n > 1000000;

  if (useSparse) {
    return calculateDiffSparse(arr1, arr2, m, n);
  } else {
    return calculateDiffStandard(arr1, arr2, m, n);
  }
}

function calculateDiffSparse(arr1, arr2, m, n) {
  const lcs = new Map();
  const getCell = (i, j) => lcs.get(`${i},${j}`) || 0;
  const setCell = (i, j, v) => lcs.set(`${i},${j}`, v);

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (arr1[i - 1] === arr2[j - 1]) {
        setCell(i, j, getCell(i - 1, j - 1) + 1);
      } else {
        setCell(i, j, Math.max(getCell(i - 1, j), getCell(i, j - 1)));
      }
    }
  }

  const result = [];
  let i = m, j = n;

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && arr1[i - 1] === arr2[j - 1]) {
      result.unshift({ type: 'equal', value: arr1[i - 1] });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || getCell(i, j - 1) >= getCell(i - 1, j))) {
      result.unshift({ type: 'added', value: arr2[j - 1] });
      j--;
    } else {
      result.unshift({ type: 'removed', value: arr1[i - 1] });
      i--;
    }
  }

  return result;
}

function calculateDiffStandard(arr1, arr2, m, n) {
  const lcs = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (arr1[i - 1] === arr2[j - 1]) {
        lcs[i][j] = lcs[i - 1][j - 1] + 1;
      } else {
        lcs[i][j] = Math.max(lcs[i - 1][j], lcs[i][j - 1]);
      }
    }
  }

  const result = [];
  let i = m, j = n;

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && arr1[i - 1] === arr2[j - 1]) {
      result.unshift({ type: 'equal', value: arr1[i - 1] });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || lcs[i][j - 1] >= lcs[i - 1][j])) {
      result.unshift({ type: 'added', value: arr2[j - 1] });
      j--;
    } else {
      result.unshift({ type: 'removed', value: arr1[i - 1] });
      i--;
    }
  }

  return result;
}

// Calculate diff statistics
export function getDiffStats(diffResult) {
  return {
    added: diffResult.filter(d => d.type === 'added').length,
    removed: diffResult.filter(d => d.type === 'removed').length,
    equal: diffResult.filter(d => d.type === 'equal').length
  };
}
