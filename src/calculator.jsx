import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import "C:/Users/luqmn/Downloads/react/my-react-app/React/src/assets/vanta.fog.min.js";

function Calculator() {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (!vantaEffect && window.VANTA?.FOG) {
      const effect = window.VANTA.FOG({
        el: vantaRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        highlightColor: 0x0,
        midtoneColor: 0xa28683,
        lowlightColor: 0xdfdde8,
        baseColor: 0xc55d5d,
        blurFactor: 0.71,
      });
      setVantaEffect(effect);
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  const calculate = (operator) => {
    const a = parseFloat(num1);
    const b = parseFloat(num2);
    if (isNaN(a) || isNaN(b)) {
      setResult("Invalid Input");
      return;
    }

    switch (operator) {
      case "+":
        setResult(a + b);
        break;
      case "-":
        setResult(a - b);
        break;
      case "*":
        setResult(a * b);
        break;
      case "/":
        setResult(b !== 0 ? a / b : "Cannot divide by zero");
        break;
      default:
        setResult("Invalid Operation");
    }
  };

  return (
    <div
      ref={vantaRef}
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>🧮 Vanta Calculator</h1>
      <input
        type="number"
        placeholder="Number 1"
        value={num1}
        onChange={(e) => setNum1(e.target.value)}
        style={inputStyle}
      />
      <input
        type="number"
        placeholder="Number 2"
        value={num2}
        onChange={(e) => setNum2(e.target.value)}
        style={inputStyle}
      />
      <div style={buttonContainerStyle}>
        <button onClick={() => calculate("+")} style={buttonStyle}>➕</button>
        <button onClick={() => calculate("-")} style={buttonStyle}>➖</button>
        <button onClick={() => calculate("*")} style={buttonStyle}>✖️</button>
        <button onClick={() => calculate("/")} style={buttonStyle}>➗</button>
      </div>
      <h2 style={{ marginTop: "20px" }}>
        Result: {result === null ? "N/A" : result}
      </h2>
    </div>
  );
}

const inputStyle = {
  margin: "10px",
  padding: "10px",
  fontSize: "1.2rem",
  borderRadius: "8px",
  border: "1px solid white",
  background: "rgba(255,255,255,0.1)",
  color: "#fff",
  width: "200px",
  textAlign: "center",
};

const buttonContainerStyle = {
  marginTop: "15px",
  display: "flex",
  gap: "10px",
};

const buttonStyle = {
  padding: "10px 15px",
  fontSize: "1.5rem",
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  color: "#fff",
  border: "1px solid white",
  borderRadius: "8px",
  cursor: "pointer",
  backdropFilter: "blur(5px)",
  transition: "transform 0.2s",
};

export default Calculator;
