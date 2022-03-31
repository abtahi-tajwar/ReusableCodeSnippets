# Dependecies
- ```npm install --save react-draft-wysiwyg draft-js```
- ```npm install draft-convert --save```
# How to use this component
```
<RichTextEditor 
    input={input.about}
    setInput={handleAbout}
/>
```js
- **setInput controlled input function which will update the input state on change**
- **Pass input prop if there is any intial text from before, this parameter is optional**