import React from "react";
import "./FileZone.css";

const FileZone = ({ handleTextSelection, defaultHtml }) => {
  return (
    <div id="file-zone">
      <div
        id="file"
        contentEditable
        onSelect={handleTextSelection}
        suppressContentEditableWarning
      >
        {defaultHtml}
      </div>
    </div>
  );
};

export default FileZone;
