# Dropzone - Pure JS
With this dropzone you can get the files from the client side, and these can be sent to the server through fetch api, ajax or any other type of connection to the server. After uploading an example using the backend asp.net framework (C# code).
## 1. initialize dropzone
The dropzone can be initialized in any application lifecycle. In this case it will be started at the end of the rendering of the page. ***The configuration is optional***.
##### HTML
```html
<div id="dropzoneContainer"></div>
```
##### JS
```javascript
document.addEventListener('DOMContentLoaded', e => {
	//Get the container for the dropzone
	document.querySelector('#dropzoneContainer').dropZone({
		//Default message "Drop file here or click to upload"
		placeholder: 'Custom message display',
		//Permits multiples files
		multiple: true,
		//Can move files to other input type file can receipt a string or element
		targetInput: document.getElementById('file')
	});
});
```
## 2. Example with form
For easier use the "targetInput" configuration and place an input inside the form as follows:
##### HTML
```html
<form id="myForm">
	<input type="text" placeholder="Input text test" name="test" />
	<input id="targetFile" name="file" />
	<div id="dropzoneContainer"></div>
	<button type="submit">Send</button>
</form>
```
Then we need to create our dropzone object as follows:
##### JS
```javascript
document.querySelector('#dropzoneContainer').dropZone({
	targetInput: document.getElementById('targetFile')
});
```
You can get the files by storing the dropzone object in a variable and calling the "getFiles" method:
```javascript
var dropzoneObj;
document.addEventListener('DOMContentLoaded', e => {
	dropzoneObj = document.querySelector('#dropZone').dropZone({
		multiple: true,
		targetInput: document.getElementById('targetFile')
	});
});

document.querySelector('#myForm').addEventListener('submit', e => {
	e.preventDefault();
	//Via form data
	let formValues = new FormData(e.target);
	//Via array of files
	let files = dropzoneObj.getFiles();
});
```
## 3. Example without for
Here it is easier, you just need to create the object and add the configuration that is needed and save it in a variable
```javascript
dropzoneObj = document.querySelector('#dropzoneContainer').dropZone();
```
Dropzone provides the "getFiles" method that returns the files in an array. Here is an example when pressing a button:
##### HTML
```html
<div id="dropzoneContainer"></div>
<button type="button" id="send">Send</button>
```
##### JS
```javascript
document.querySelector('#send').addEventListener('click', e => {
	let files = dropzoneObj.getFiles();
	console.log(files)
});
```
![](https://live.staticflickr.com/1216/1408154388_b34a66bdcf_w.jpg)
