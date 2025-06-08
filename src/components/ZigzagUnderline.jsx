import React from "react";

const ZigzagUnderline = ({
  text,
  color = "#d9c178",
  fontSize = "1.2rem",
  alignSelf,
}) => {
  return (
    <div
      style={{
        display: "inline-block",
        textAlign: "center",
        alignSelf,
        color,
      }}
    >
      <h1 style={{ fontSize, fontWeight: "bold" }}>{text}</h1>
      <svg
        viewBox="0 0 160 10"
        preserveAspectRatio="none"
        style={{ width: "100%", height: "10px", marginTop: "4px" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <polyline
          points="0,10 10,0 20,10 30,0 40,10 50,0 60,10 70,0 80,10 90,0 100,10 110,0 120,10 130,0 140,10 150,0 160,10"
          stroke={color}
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </div>
  );
};

export default ZigzagUnderline;
