import React, { Component } from 'react';
import { EditorState, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import styled from 'styled-components'
import { convertFromHTML } from 'draft-js'
import { convertToHTML } from 'draft-convert';

export default function RichTextEditor({ input="<p>About</p>", setInput }) {    
    const [editorState, setEditorState] = React.useState(EditorState.createEmpty())    
    const onEditorStateChange = (editorState) => {
        setInput(convertToHTML(editorState.getCurrentContent()))
        setEditorState(editorState);
    };
    React.useEffect(() => {
        const input_state = ContentState.createFromBlockArray(convertFromHTML(input))
        setEditorState(EditorState.createWithContent(input_state))
    }, [])

    return (
        <Wrapper>
            <Editor
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={onEditorStateChange}
            />
        </Wrapper>
    )
}
const Wrapper = styled.div`
    margin-bottom: 15px;
    .rdw-editor-main {
        border: 1px solid #e9ecef;
        padding-left: 10px;
        padding-right: 10px;
        height: 150px;
        box-sizing: border-box;
    }
`