import React from "react";
import "./ControlPanel.css";

const ControlPanel = ({ actions, handleModificator }) => {
  const renderButtons = action => {
    const active = actions[action] ? "active" : "";
    return (
      <button
        key={action}
        className={`format-action ${action} ${active}`}
        type="button"
        onClick={() => {
          handleModificator(action);
        }}
      >
        <span>{action[0].toUpperCase()}</span>
      </button>
    );
  };
  return (
    <div id="control-panel">
      <div id="format-actions">{Object.keys(actions).map(renderButtons)}</div>
    </div>
  );
};

export default ControlPanel;
