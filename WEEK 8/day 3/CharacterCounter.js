import React, { useRef, useState } from "react";

export default function CharacterCounter() {
  const inputRef = useRef(null);
  const [count, setCount] = useState(0);

  const handleInput = () => {
    setCount(inputRef.current.value.length);
  };

  return (
    <div style={{ padding: "20px" }}>
      <input
        type="text"
        ref={inputRef}
        onInput={handleInput}
        placeholder="Type something..."
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />
      <p>Character count: {count}</p>
    </div>
  );
}
