import React, { Component } from "react";
import "./App.css";
import getMockText from "./text.service";
import TextEditor from "./text-editor/TextEditor";

class App extends Component {
  state = {
    defaultHtml: "",
  };

  componentDidMount() {
    this.getText();
  }

  getText() {
    getMockText().then((defaultHtml) => {
      this.setState({ defaultHtml });
    });
  }

  render() {
    const { defaultHtml } = this.state;
    return (
      <div className="App">
        <header>
          <span>Simple Text Editor</span>
        </header>
        <main>
          <TextEditor defaultHtml={defaultHtml} />
        </main>
      </div>
    );
  }
}

export default App;
