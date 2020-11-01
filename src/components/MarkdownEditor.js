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
      markdownContent: ""
    };
    this.setValue = this.setValue.bind(this);
    this.handleUploadFile = this.handleUploadFile.bind(this);
    this.handleDownloadPreviewFile = this.handleDownloadPreviewFile.bind(this);
    this.handleDownloadTextFile = this.handleDownloadTextFile.bind(this);
  }

  componentDidMount() {
    const listTextArea = document.getElementsByTagName("textarea");
    listTextArea[0].placeholder =
      "Type the markdown content here or upload a markdown file by clicking at Upload button";
  }

  setValue(value) {
    this.setState({ markdownContent: value });
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
          onClick={this.handleDownloadTextFile}
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

  saveFile(fileName, content) {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = fileName;
    link.href = url;
    link.click();
  }

  handleDownloadPreviewFile() {
    // console.log(document.)
    const listEl = document.getElementsByClassName("markdown-preview");
    this.saveFile("preview-download.html", listEl[0].innerHTML);
  }

  handleDownloadTextFile() {
    this.saveFile("markdown-download.md", this.state.markdownContent);
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
            value={this.state.markdownContent}
            onChange={this.setValue}
          />
        </div>
        <div className="markdown-preview">
          <div className="download-preview-file">
            <FaDownload onClick={this.handleDownloadPreviewFile} />
          </div>
          <ReactMarkdown
            source={this.state.markdownContent}
            allowDangerousHtml
          />
        </div>
      </div>
    );
  }
}

export default MarkdownEditor;
