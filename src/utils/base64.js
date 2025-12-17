// Base64 Encoding (using TextEncoder for proper Unicode support)
export function encodeBase64(text) {
  const encoder = new TextEncoder();
  const uint8Array = encoder.encode(text);
  const binaryString = Array.from(uint8Array)
    .map(byte => String.fromCharCode(byte))
    .join('');
  return btoa(binaryString);
}

// Base64 Decoding (using TextDecoder for proper Unicode support)
export function decodeBase64(base64) {
  const binaryString = atob(base64);
  const uint8Array = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    uint8Array[i] = binaryString.charCodeAt(i);
  }
  const decoder = new TextDecoder();
  return decoder.decode(uint8Array);
}
