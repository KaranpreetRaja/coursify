import { useState } from 'react';

const useFileToBlob = () => {
  const fileToBlob = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const textDecoder = new TextDecoder('utf-8');
    const blob = textDecoder.decode(arrayBuffer);
    return blob;
  };

  const [blob, setBlob] = useState('');

  return { blob };
};

export default useFileToBlob;
