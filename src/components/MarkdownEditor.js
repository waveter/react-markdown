import React from "react";
import ReactMarkdown from "react-markdown";
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";
import "./MarkdownEditor.css";
import { FaImage } from "react-icons/fa";

const uploadImageCommand = {
  name: "upload-image-command",
  icon: () => <FaImage className="upload-image" />,
  execute: opts => {
    opts.textApi.replaceSelection("TBD");
  }
};

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
          <ReactMde
            commands={{
              "upload-image": uploadImageCommand
            }}
            toolbarCommands={[
              ["header", "bold", "italic", "strikethrough"],
              ["link", "quote", "code", "image", "upload-image"],
              ["unordered-list", "ordered-list", "checked-list"]
            ]}
            value={this.state.input}
            onChange={this.setValue}
          />
        </div>
        <div className="markdown-preview">
          <ReactMarkdown source={this.state.input} />
        </div>
      </div>
    );
  }
}

export default MarkdownEditor;
