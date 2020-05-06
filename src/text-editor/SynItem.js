import React from "react";
import "./styles.css";

const SynItem = ({ onClick, word }) => (
  <span className="syn-text" onClick={onClick}>
    {word}
  </span>
);

export default SynItem;
