import React, { useEffect, useState } from 'react';

function App() {
  const [getMessage, setGetMessage] = useState('');
  const [postMessage, setPostMessage] = useState('');
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/hello');
        const data = await response.json();
        setGetMessage(data.message);
      } catch (error) {
        console.error('Error fetching GET message:', error);
      }
    };

    fetchMessage();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/world', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: inputValue }),
      });
      const data = await response.json();
      setPostMessage(data.message);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>{getMessage}</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type something..."
        />
        <button type="submit">Send</button>
      </form>

      <p>{postMessage}</p>
    </div>
  );
}

export default App;
