import React from "react";
import "./ControlPanel.css";

const ControlPanel = ({ actions, handleModificator }) => {
  const handleButton = (action) => () => handleModificator(action);

  const renderButtons = (action) => {
    const active = actions[action] ? "active" : "";
    const actionFirstChar = action[0];

    return (
      <button
        key={action}
        className={`format-action ${action} ${active}`}
        type="button"
        onClick={handleButton(action)}
      >
        <span className="button-text">{actionFirstChar}</span>
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
