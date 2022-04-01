# Dependencies
- draft-js
- react-draft-wysiwyg
- draft-convert
## First install
```npm install draft-js react-draft-wysiwyg draft-convert```
## How to use
- Create a component named BlogEditor or any name your prefer
- Paste the codes from BlogEditor.js
- Call Blog editor from the component you want to include the editor
```javascript
    <BlogEditor handleOutput={handleOutput} />
```
- Define handleOutput function
    - "html" and "raw" parameters updates on every change on the editor
    - html: Returns the whole html output of the page which could be used directly to any website frontend
    - raw: Returns an array of object with details which contains all the informations from the editor. nature of object will be described below  
```javascript
    const handleOutput = (html, raw) => {
        console.log(html, raw)
    }
```
## Example object
```javascript
[
    {
        type: "image",
        file: e.target.files[0],
        content: `<img src=${reader.result} />`
    },
    {
        type: "text",
        content: currentTextElement.content
    }
]
```
- **type**: image, text
- **content**: html output of every block
- **file**: File instance of image, only avaible for object containing image type
