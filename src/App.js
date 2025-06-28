import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [temp, setTemp] = useState('');
  const [word, setWord] = useState('');
  const [size, setSize] = useState(400);
  const [bgColor, setBgColor] = useState('ffffff');
  const [qrCode, setQrCode] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (word.trim()) {
      setQrCode(
        `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
          word
        )}&size=${size}x${size}&bgcolor=${bgColor}`
      );
    }
  }, [word, size, bgColor]);

  const handleClick = () => {
    if (temp.trim()) {
      setWord(temp);
    } else {
      alert('Please enter text to generate QR code.');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(qrCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="App">
      <img src="logo512.png" alt="KNS Logo" className="logo" />
      <h1>KNS QR Code Generator</h1>

      <div className="input-box">
        <div className="gen">
          <input
            type="text"
            value={temp}
            onChange={(e) => setTemp(e.target.value)}
            placeholder="Enter text to encode"
          />
          <button className="button" onClick={handleClick}>
            Generate
          </button>
        </div>

        <div className="extra">
          <h5>Background Color:</h5>
          <input
            type="color"
            value={`#${bgColor}`}
            onChange={(e) => setBgColor(e.target.value.substring(1))}
          />
          <h5>Dimension: {size}px</h5>
          <input
            type="range"
            min="200"
            max="600"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
          />
        </div>
      </div>

      {qrCode && (
        <div className="output-box">
          <img src={qrCode} alt={`QR code for ${word}`} />
          <a href={qrCode} download="QRCode" rel="noopener noreferrer">
            <button type="button">Download</button>
          </a>
          <button type="button" onClick={handleCopy}>
            {copied ? 'Copied!' : 'Copy QR URL'}
          </button>
        </div>
      )}

      {/* Footer */}
      <footer className="app-footer">
        <p>© 2024 KNS QR Code Generator</p>
        <p>
          Developed by{' '}
          <a
            href="https://techverrasolutions.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong>Techverra Solutions Pvt. Ltd.</strong>
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
