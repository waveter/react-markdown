import React from "react";
import "./MarkdownEditor.css";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";
import "brace/ext/language_tools";
import "ace-builds/src-noconflict/ext-language_tools";
import { addCompleter } from "ace-builds/src-noconflict/ext-language_tools";
import jsBeautify from "js-beautify";
import { Button } from "react-bootstrap";
import { LIST_COMMON_TOKENS, LIST_SUGGESTION_KEY } from "../constant/const";
import ReactMarkdown from "react-markdown";
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";

class MarkdownEditor extends React.Component {
  constructor() {
    super();
    this.state = {
      input: "# This is a header\n\nAnd this is a paragraph"
    };
    this.setValue = this.setValue.bind(this);
  }

  setValue(value) {
    this.setState({ input: value });
  }

  componentDidMount() {}

  render() {
    return (
      <div className="body-container">
        <div className="markdown-editor">
          <ReactMde value={this.state.input} onChange={this.setValue} />
        </div>
        <div className="markdown-preview">
          <ReactMarkdown source={this.state.input} />
        </div>
      </div>
    );
  }
}

export default MarkdownEditor;
