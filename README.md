# dummy-nw-builder
application builder for nw.js

## Config 
+ **version**
	+ type: string
	+ default value: ''
	+ valid values: >= v0.13.0
+ **architecture**:
	+ type: string
	+ default value: ''
	+ valid values: x64, ia32
+ **type**:
	+ type: string
	+ default value: normal
	+ valid values: normal, sdk
+ **platform**:
	+ type: string
	+ default value: ''
	+ valid values: linux, win, mac
+ **sourceFolder**:
	+ type: string
	+ default value: ''
	+ valid values: existing folder path
+ **buildFolder**:
	+ type: string
	+ default value: ./build
	+ valid values: writeable folder path
+ **tmpFolder**:
	+ type: string
	+ default value: ./tmp
	+ valid values: writeable folder path

## Example
```
const Builder = require('dummy-nw-builder');

cons config = {
    version: 'v0.16.1',
    architecture: 'x64',
    platform: 'win',
    type: 'normal',
    sourceFolder: '/app/source',
    buildFolder: '/app/build',
    tmpFolder: '/app/cache'
};

const builder = new Builder(config);
builder.build()
	.then(() => console.log('success'), () => console.log('error'));

```