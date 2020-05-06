import React, { Component } from "react";
import ControlPanel from "../control-panel/ControlPanel";
import FileZone from "../file-zone/FileZone";
import { fetchWords } from "../utils";
import SynList from "./SynList";

export default class TextEditor extends Component {
  state = {
    actions: {
      bold: false,
      italic: false,
      underline: false,
    },
    data: [],
  };

  handleModificator = (action) => {
    const copiedActions = { ...this.state.actions };
    copiedActions[action] = !copiedActions[action];

    this.setState({ actions: copiedActions });
    document.execCommand(action, false, null);
  };

  handleTextSelection = () => {
    const copiedActions = { ...this.state.actions };
    const actionsKeys = Object.keys(copiedActions);

    actionsKeys.forEach((action) => {
      copiedActions[action] = document.queryCommandState(action);
    });

    this.setState({ actions: copiedActions });
  };

  insertText = ({ range, selection, trimmedReplacementText }) => {
    if (selection.rangeCount) {
      range = selection.getRangeAt(0);
      range.deleteContents();
      range.insertNode(document.createTextNode(trimmedReplacementText));
    }
  };

  replaceSelectedText = (replacementText) => {
    let selection, range;
    const trimmedReplacementText = replacementText.trim();

    if (window.getSelection) {
      selection = window.getSelection();
      this.insertText({ selection, trimmedReplacementText, range });
    }
  };

  handleSyn = () => {
    if (window.getSelection) {
      const selectionText = window.getSelection().toString();

      fetchWords(selectionText).then((data) => {
        this.setState({ data });
      });
    }
  };

  onSynItemClick = ({ currentTarget: { textContent } }) => {
    this.replaceSelectedText(textContent);
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
            <SynList data={data} onClick={this.onSynItemClick} />
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
