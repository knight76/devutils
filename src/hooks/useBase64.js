import { useState, useCallback } from 'react';
import { encodeBase64, decodeBase64 } from '../utils';

export function useBase64() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('text'); // 'text' or 'image'
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [decodedImage, setDecodedImage] = useState('');

  const encode = useCallback(() => {
    try {
      const encoded = encodeBase64(input);
      setOutput(encoded);
    } catch (e) {
      setOutput('인코딩 오류: ' + e.message);
    }
  }, [input]);

  const decode = useCallback(() => {
    try {
      const decoded = decodeBase64(input);
      setOutput(decoded);
    } catch (e) {
      setOutput('디코딩 오류: 유효하지 않은 Base64');
    }
  }, [input]);

  const handleImageUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setOutput(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const decodeToImage = useCallback(() => {
    try {
      if (input.startsWith('data:image')) {
        setDecodedImage(input);
      } else {
        setDecodedImage(`data:image/png;base64,${input}`);
      }
    } catch (e) {
      alert('유효하지 않은 이미지 Base64입니다.');
    }
  }, [input]);

  const switchMode = useCallback((newMode) => {
    setMode(newMode);
    setInput('');
    setOutput('');
    setImageFile(null);
    setImagePreview('');
    setDecodedImage('');
  }, []);

  const reset = useCallback(() => {
    setInput('');
    setOutput('');
    setImageFile(null);
    setImagePreview('');
    setDecodedImage('');
  }, []);

  return {
    input,
    output,
    mode,
    imageFile,
    imagePreview,
    decodedImage,
    setInput,
    encode,
    decode,
    handleImageUpload,
    decodeToImage,
    switchMode,
    reset
  };
}
