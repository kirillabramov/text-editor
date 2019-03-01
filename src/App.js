import React, { Component } from "react";
import "./App.css";
import getMockText from "./text.service";
import TextEditor from "./text-editor/TextEditor";

class App extends Component {
  state = {
    defaultHtml: ""
  };

  componentDidMount() {
    this.getText();
  }

  getText() {
    getMockText().then(defaultHtml => {
      this.setState({ defaultHtml });
    });
  }

  render() {
    const { defaultHtml } = this.state;
    const actions = {
      bold: false,
      italic: false,
      underline: false
    };
    return (
      <div className="App">
        <header>
          <span>Simple Text Editor</span>
        </header>
        <main>
          <TextEditor actions={actions} defaultHtml={defaultHtml} />
        </main>
      </div>
    );
  }
}

export default App;
