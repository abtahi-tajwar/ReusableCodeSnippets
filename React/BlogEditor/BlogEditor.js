import React from 'react'
import { Row, Col } from 'react-bootstrap'
import RichTextEditor from './RichTextEditor'
import { Button } from '@mui/material'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box';
import styled from 'styled-components'
import EditIcon from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete'
import TextFieldsIcon from '@mui/icons-material/TextFields';
import ImageIcon from '@mui/icons-material/Image';

function BlogEditor({ handleOutput }) {

    const [elements, setElements] = React.useState([])
    const [currentTextElement, setCurrentTextElement] = React.useState({
        mode: "create",
        index: -1,
        content: ""
    })
    const [modelIsOpen, setModalIsOpen] = React.useState(false)
    React.useEffect(() => {
        if(handleOutput) {
            var html = ""
            elements.forEach(item => {
                html += item.content
            })
            handleOutput(html, elements)
        }
    }, [elements])
    const handleCurrentTextElementInput = (value) => {        
        setCurrentTextElement({
            ...currentTextElement,
            content: value
        })        
    }
    const handleEdit = (index) => {
        setCurrentTextElement({
            mode: "edit",
            index: index,
            content: elements[index].content
        })
        setModalIsOpen(true)
    }
    const handleDelete = (index) => {
        setElements(elements.filter((item, i) => i !== index))
    }
    const handleCreateAtIndex = (index) => {
        setCurrentTextElement({
            mode: "create",
            index: index + 1,
            content: ""
        })
        setModalIsOpen(true)
    }
    const handleCreateOrEditText = () => {
        setModalIsOpen(false)
        if(currentTextElement.mode === 'create') {
            if (currentTextElement.index === -1) {
                setElements([
                    ...elements,
                    {
                        type: "text",
                        content: currentTextElement.content
                    }
                ])
            } else {
                var temp = elements
                temp.splice(currentTextElement.index, 0, {
                    type: "text",
                    content: currentTextElement.content
                })
                setElements(temp)
            }
            setCurrentTextElement({
                mode: "create",
                index: -1,
                content: ""
            })
        } else {
            setElements(elements.map((item, index) => {
                if(currentTextElement.index === index) {
                    return {
                        type: "text",
                        content: currentTextElement.content
                    }
                } 
                return item
            }))
            setCurrentTextElement({
                mode: "create",
                index: -1,
                content: ""
            })
        }
    }
    const handleUploadImage = (e) => {
        const blob = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(blob)
        reader.onload = function() {
            setElements([
                ...elements,
                {
                    type: "image",
                    file: e.target.files[0],
                    content: `<img src=${reader.result} />`
                }
            ])
        }
    }
    const handleUploadImageAtIndex = (e, index) => {
        const blob = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(blob)
        reader.onload = function() {
            var temp = elements
            temp.splice(index+1, 0, {
                type: "image",
                file: e.target.files[0],
                content: `<img src=${reader.result} />`
            })
            setElements([
                ...temp
            ])
        }
    }
    
  return (
    <React.Fragment>
        <Modal
            open={modelIsOpen}
            onClose={() => setModalIsOpen(false) }
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
                <h3>Add Pararaph</h3>
                <RichTextEditor 
                    value={currentTextElement.content}
                    handleValue={handleCurrentTextElementInput}
                    height="400px"
                />
                <Row>
                    <Col>
                        <Button variant="contained" onClick={handleCreateOrEditText}>Save</Button> &nbsp;
                        <Button variant="outlined" onClick={() => setModalIsOpen(false)}>Cancel</Button>
                    </Col>
                </Row>
            </Box>
        </Modal>
        {elements.map((item, index) => 
            <Row key={index}>         
                {item.type === "text" && <Col>
                    <TextPreviewBlock>
                        <div dangerouslySetInnerHTML={{__html: item.content }}></div>
                        <div className="button">
                            <button onClick={() => handleEdit(index)}><EditIcon /></button>
                            <button onClick={() => handleDelete(index)}><Delete /></button>
                        </div>
                        <div className="addAfter">
                            <Button onClick={() => handleCreateAtIndex(index)}><TextFieldsIcon /></Button>
                            <Button component="label"><ImageIcon />
                                <input type="file" onChange={(e) => handleUploadImageAtIndex(e, index)} hidden />
                            </Button>
                        </div>
                    </TextPreviewBlock>
                </Col>}
                {item.type === "image" && <Col>
                    <ImagePreviewBlock>
                        <div dangerouslySetInnerHTML={{__html: item.content }}></div>
                        <div className="button">
                            <button onClick={() => handleDelete(index)}><Delete /></button>
                        </div>
                    </ImagePreviewBlock>
                </Col>}
            </Row>
        )}
        <div>
            <Button variant="outlined" onClick={() => setModalIsOpen(true)}>Add Text</Button> &nbsp;
            <Button variant="outlined" component="label">Add Picture<input type="file" onChange={handleUploadImage} hidden /></Button>
        </div>
    </React.Fragment>
  )
}
const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}
const TextPreviewBlock = styled.div`
    position: relative;
    box-sizing: border-box;
    padding: 50px;
    .button {
        position: absolute;
        right: 0px;
        top: 0px;
        button {            
            border: none;
            outline: none;
            background-color: transparent;
            cursor: pointer;
            border-radius: 5px;
            transition: background-color .3s ease-out;
            &:hover {
                background-color: #f5f5f5;
            }
            svg {
                height: 16px;
            }
        }
    }
`
const SmallButton = styled.button`
    border: none;
    outline: none;
    border: 1px solid black;
    padding: 0px 5px;
    background: transparent;
    border-radius: 3px;
    margin: 0px 5px;
    svg {
        transform: scale(0.5);
    }
    &:hover {
        background-color: #f5f5f5;
    }
`
const SmallFileInput = styled.input.attrs(props => ({
    type: 'file'
}))`
    border: none;
    outline: none;
    border: 1px solid black;
    padding: 0px 5px;
    background: transparent;
    border-radius: 3px;
    margin: 0px 5px;
    svg {
        transform: scale(0.5);
    }
    &:hover {
        background-color: #f5f5f5;
    }
`
const ImagePreviewBlock = styled.div`
    position: relative;
    padding: 50px;
    box-sizing: border-box;
    img {
        max-width: 100%;
    }
    .button {
        position: absolute;
        right: 0px;
        top: 0px;
        button {            
            border: none;
            outline: none;
            background-color: transparent;
            cursor: pointer;
            border-radius: 5px;
            transition: background-color .3s ease-out;
            &:hover {
                background-color: #f5f5f5;
            }
            svg {
                height: 16px;
            }
        }
    }
`
export default BlogEditor