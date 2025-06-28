import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [temp, setTemp] = useState("");
  const [word, setWord] = useState("");
  const [size, setSize] = useState(400);
  const [bgColor, setBgColor] = useState("ffffff");
  const [qrCode, setQrCode] = useState("");
  const [copied, setCopied] = useState(false); // For copy feedback

  // Update QR code when word, size, or background color changes
  useEffect(() => {
    setQrCode(
      `http://api.qrserver.com/v1/create-qr-code/?data=${word}&size=${size}x${size}&bgcolor=${bgColor}`
    );
  }, [word, size, bgColor]);

  // Handle generate button click
  function handleClick() {
    if (temp.trim()) {
      setWord(temp);
    } else {
      alert("Please enter text to generate QR code.");
    }
  }

  // Handle copy QR URL
  function handleCopy() {
    navigator.clipboard.writeText(qrCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="App">
    <img src="/logo196.png" alt="KNS Logo" className="logo" />

      <h1>KNS QR Code Generator</h1>
      <div className="input-box">
        <div className="gen">
          <input
            type="text"
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
            onChange={(e) => setBgColor(e.target.value.substring(1))}
          />
          <h5>Dimension:</h5>
          <input
            type="range"
            min="200"
            max="600"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
        </div>
      </div>
      <div className="output-box">
        <img src={qrCode} alt={`QR code for ${word}`} />
        <a href={qrCode} download="QRCode" rel="noopener noreferrer">
          <button type="button">Download</button>
        </a>
        <button type="button" onClick={handleCopy}>
          {copied ? "Copied!" : "Copy QR URL"}
        </button>
      </div>
    </div>
  );
}

export default App;
