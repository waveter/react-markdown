import React from "react";
import ReactMarkdown from "react-markdown/with-html";
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";
import "./MarkdownEditor.css";
import { FaImage, FaUpload, FaDownload } from "react-icons/fa";

const uploadImageCommand = {
  name: "upload-image-command",
  icon: () => <FaImage className="upload-image" />,
  execute: opts => {
    opts.textApi.replaceSelection("TBD");
  }
};

const downloadFileCommand = {
  name: "download-file-command",
  icon: () => <FaDownload className="download-file" />,
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
    this.handleUploadFile = this.handleUploadFile.bind(this);
  }

  setValue(value) {
    this.setState({ input: value });
  }

  handleOpenUploadFile() {
    document.getElementById("file").click();
  }

  getUploadFileCommand() {
    return {
      name: "upload-file-command",
      icon: () => (
        <FaUpload className="upload-file" onClick={this.handleOpenUploadFile} />
      ),
      execute: () => {}
    };
  }

  handleUploadFile(e) {
    const reader = new FileReader();
    reader.onload = e => {
      this.setValue(e.target.result);
    };
    reader.readAsText(e.target.files[0]);
  }

  render() {
    return (
      <div className="body-container">
        <input
          type="file"
          id="file"
          style={{ display: "none" }}
          onChange={e => this.handleUploadFile(e)}
        />
        <div className="markdown-editor">
          <ReactMde
            commands={{
              "upload-image": uploadImageCommand,
              "upload-file": this.getUploadFileCommand(),
              "download-file": downloadFileCommand
            }}
            toolbarCommands={[
              ["header", "bold", "italic", "strikethrough"],
              ["link", "quote", "code", "image"],
              ["unordered-list", "ordered-list", "checked-list"],
              ["upload-file", "download-file"]
            ]}
            value={this.state.input}
            onChange={this.setValue}
          />
        </div>
        <div className="markdown-preview">
          <ReactMarkdown source={this.state.input} allowDangerousHtml />
        </div>
      </div>
    );
  }
}

export default MarkdownEditor;
