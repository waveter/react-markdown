import React from "react";
import ReactMarkdown from "react-markdown/with-html";
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";
import "./MarkdownEditor.css";
import { FaImage, FaUpload, FaDownload } from "react-icons/fa";

class MarkdownEditor extends React.Component {
  constructor() {
    super();
    this.state = {
      input: "# This is a header\n\nAnd this is a paragraph"
    };
    this.setValue = this.setValue.bind(this);
    this.handleUploadFile = this.handleUploadFile.bind(this);
    this.handleDownloadFile = this.handleDownloadFile.bind(this);
  }

  setValue(value) {
    this.setState({ input: value });
  }

  handleOpenUploadFile() {
    document.getElementById("file").click();
  }

  getUploadImageCommand() {
    return {
      name: "upload-image-command",
      icon: () => <FaImage className="upload-image" />,
      execute: opts => {
        opts.textApi.replaceSelection("TBD");
      }
    };
  }

  getDownloadFileCommand() {
    return {
      name: "download-file-command",
      icon: () => (
        <FaDownload
          className="download-file"
          onClick={this.handleDownloadFile}
        />
      ),
      execute: () => {}
    };
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

  handleDownloadFile() {
    // console.log(document.)
    const listEl = document.getElementsByClassName("markdown-preview");
    console.log(listEl[0]);
    console.log(listEl[0].innerHTML);
    const blob = new Blob([listEl[0].innerHTML], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `markdown-download.html`;
    link.href = url;
    link.click();
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
              "upload-image": this.getUploadImageCommand(),
              "upload-file": this.getUploadFileCommand(),
              "download-file": this.getDownloadFileCommand()
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
