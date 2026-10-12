import React, { useState } from "react";

function App() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [operation, setOperation] = useState("add");
  const [result, setResult] = useState("");

  const calculate = () => {
    const a = Number(num1);
    const b = Number(num2);

    if (num1 === "" || num2 === "") {
      setResult("Please enter both numbers");
      return;
    }

    switch (operation) {
      case "add":
        setResult(a + b);
        break;
      case "subtract":
        setResult(a - b);
        break;
      case "multiply":
        setResult(a * b);
        break;
      case "divide":
        setResult(b === 0 ? "Cannot divide by zero" : a / b);
        break;
      default:
        setResult("Invalid operation");
    }
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "50px auto",
        padding: "25px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ textAlign: "center" }}>React Calculator</h1>

      <input
        type="number"
        value={num1}
        onChange={(e) => setNum1(e.target.value)}
        placeholder="Enter first number"
        style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
      />

      <input
        type="number"
        value={num2}
        onChange={(e) => setNum2(e.target.value)}
        placeholder="Enter second number"
        style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
      />

      <select
        value={operation}
        onChange={(e) => setOperation(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
      >
        <option value="add">Addition</option>
        <option value="subtract">Subtraction</option>
        <option value="multiply">Multiplication</option>
        <option value="divide">Division</option>
      </select>

      <button
        onClick={calculate}
        style={{
          width: "100%",
          padding: "12px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Calculate
      </button>

      <h2 style={{ textAlign: "center", marginTop: "20px" }}>Result: {result}</h2>
    </div>
  );
}

export default App;
