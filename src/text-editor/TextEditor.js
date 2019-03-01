import React, { Component } from "react";
import ControlPanel from "../control-panel/ControlPanel";
import FileZone from "../file-zone/FileZone";
import { fetchWords } from "../utils";
import "./TextEditor.css";

export default class TextEditor extends Component {
  state = { actions: this.props.actions, data: null };

  handleModificator = action => {
    const actions = { ...this.state.actions };
    actions[action] = !actions[action];
    this.setState({ actions });
    document.execCommand(action, false, null);
  };

  handleTextSelection = () => {
    const actions = { ...this.state.actions };
    Object.keys(actions).forEach(action => {
      actions[action] = document.queryCommandState(action);
    });
    this.setState({
      actions
    });
  };

  replaceSelectedText = replacementText => {
    let selection, range;
    if (window.getSelection) {
      selection = window.getSelection();
      if (selection.rangeCount) {
        range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(document.createTextNode(replacementText));
      }
    } else if (document.selection && document.selection.createRange) {
      range = document.selection.createRange();
      range.text = replacementText;
    }
  };

  handleSyn = () => {
    if (window.getSelection) {
      fetchWords(window.getSelection().toString()).then(data => {
        this.setState({ data });
      });
    }
  };
  render() {
    const { defaultHtml } = this.props;
    const { actions, data } = this.state;
    return (
      <div>
        <div className="wrapper">
          <button onClick={this.handleSyn}>Get synonyms</button>
          <ControlPanel
            handleModificator={this.handleModificator}
            actions={actions}
          />
          <div className="syn">
            {!data ? (
              <div>Selected text and click upper button to get synonyms...</div>
            ) : data.length < 1 ? (
              <div>Hm... There is no synonyms for that kind of a word..</div>
            ) : (
              data.map(({ word }) => (
                <span
                  key={word}
                  className="syn__text"
                  onClick={e => {
                    this.replaceSelectedText(
                      e.currentTarget.textContent.trim()
                    );
                  }}
                >
                  {word}
                </span>
              ))
            )}
          </div>
        </div>

        <FileZone
          handleTextSelection={this.handleTextSelection}
          defaultHtml={defaultHtml}
        />
      </div>
    );
  }
}
