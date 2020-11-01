import React from 'react';
import './OnlineCompiler.css';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";
import 'brace/ext/language_tools';
import 'ace-builds/src-noconflict/ext-language_tools';
import { addCompleter } from 'ace-builds/src-noconflict/ext-language_tools';
import jsBeautify from 'js-beautify';
import { Button } from 'react-bootstrap';
import { LIST_COMMON_TOKENS, LIST_SUGGESTION_KEY } from '../constant/const';

class OnlineCompiler extends React.Component {

    constructor() {
        super();
        this.state = {
            editorContent: '',
            result: [],
            error: '',
            cursorPos: {
                row: 0,
                column: 0
            }
        }
        this.onChange = this.onChange.bind(this);
    }

    onChange(newValue) {
        this.setState(() => ({
            editorContent: newValue
        }));
    }

    handleClickRunBtn() {
        this.setState(() => ({
            result: []
        }));
        this.setState(() => ({
            error: ''
        }));
        console.log = (x) => {
            this.setState((state) => ({
                result: [...state.result, x]
            }));
        }
        try {
            eval(this.state.editorContent);
            this.setState(() => ({
                error: ''
            }));
        } catch (e) {
            this.setState(() => ({
                error: String(e)
            }))
            this.setState(() => ({
                result: []
            }));
        }
    }

    handleAddToken(token) {

        const pos = JSON.parse(JSON.stringify(this.state.cursorPos));
        if (token === 'tab') {
            token = '\t';
        }
        this.refs.ace.editor.session.insert(pos, token);
        if (['[]', '{}', '()'].includes(token)) {
            pos.column = pos.column + 1;
            this.refs.ace.editor.session.insert(pos, '\n\t\n');
            this.refs.ace.editor.selection.moveTo(pos.row + 1, 1);
        } else if (['\'\'', '""'].includes(token)) {
            pos.column = pos.column + 1;
            this.refs.ace.editor.selection.moveTo(pos.row, pos.column);
        }
        this.refs.ace.editor.focus();
    }

    handleClickBeautifyBtn() {
        let beautifiedContent = this.state.editorContent;
        try {
            beautifiedContent = jsBeautify(this.state.editorContent);
        } catch (e) {

        }
        this.setState(() => ({
            editorContent: beautifiedContent
        }));
    }

    handleOnCursorChange(selection) {
        this.setState(() => ({
            cursorPos: selection.getCursor()
        }));
    }

    componentDidMount() {
        const listSuggestion = LIST_SUGGESTION_KEY.map(key => { return { name: key, value: key, caption: key, score: 1000 } });
        addCompleter({
            getCompletions: function (editor, session, pos, prefix, callback) {
                callback(null,
                    listSuggestion
                );
            },
        });
    }

    render() {
        return (
            <div className='body-container'>
                <div className='common-tokens-container'>
                    {LIST_COMMON_TOKENS.map(token => (<div className='btn-token-container'> <button className='btn-token' onClick={() => this.handleAddToken(token)}>{token}</button></div>))}
                </div>
                <AceEditor ref="ace"
                    value={this.state.editorContent}
                    mode="javascript"
                    theme="github"
                    width="calc(100vw - 40px)"
                    height="300px"
                    onChange={this.onChange}
                    name="UNIQUE_ID_OF_DIV"
                    fontSize={14}
                    wrapEnabled={true}
                    showPrintMargin={false}
                    editorProps={{ $blockScrolling: true }}
                    setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: true
                    }}
                    onCursorChange={(selection) => this.handleOnCursorChange(selection)}
                />
                <div className="button-container">
                    <div className="button-group">
                        <Button color="secondary" onClick={() => this.handleClickBeautifyBtn()}>Beautify</Button>
                        <Button color="primary" onClick={() => this.handleClickRunBtn()}>Run</Button>
                    </div>
                </div>
                <div className="result-container">
                    {this.state.result.map((res, index) => <div key={index} className='line-result'>{res}</div>)}
                    <div className='error-section'>
                        {this.state.error}
                    </div>
                </div>
            </div>
        );
    }
}

export default OnlineCompiler;