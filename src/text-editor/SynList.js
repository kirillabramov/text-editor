import React from "react";
import SynItem from "./SynItem";

const SynList = ({ data, onClick }) => {
  if (data && !data.length) {
    return <div>No synonyms found</div>;
  }
  return (
    <div className="syn">
      {data.map(({ word }) => (
        <SynItem word={word} onClick={onClick} key={word} />
      ))}
    </div>
  );
};

export default SynList;
