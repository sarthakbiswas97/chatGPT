import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer>
      <div
        style={{
          width: "100%",
          minHeight: "20vh",
          maxHeight: "30vh",
          marginTop: 60,
        }}
      >
        <p style={{ fontSize: "30px", textAlign: "center", padding: "20px" }}>
          Built Using OpenAI's API
        </p>
      </div>
    </footer>
  );
};
