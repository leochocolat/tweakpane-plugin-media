# Tweakpane media plugin

Plugin for image and video inputs for [Tweakpane](https://tweakpane.github.io/docs/).

![](https://leochocolat.github.io/tweakpane-plugin-media/test/demo.png)

# For plugin users

## Installation

```bash
npm install tweakpane
npm i tweakpane-plugin-media
```

```js
import {Pane} from 'tweakpane';
import * as TweakpanePluginMedia from 'tweakpane-plugin-media';

const pane = new Pane();
pane.registerPlugin(TweakpanePluginMedia);
```

## Usage

### Image

```js
pane.addBinding(PARAMS, 'image', {
	label: 'Image',
	view: 'image',
	height: 80, // Preview block height in px - Optional (Default to 100)
	objectFit: 'contain', // Preview block object fit - Optional (Default to cover)
	showMonitor: true, // Whether or not to show the file name monitor - Optional (Default to false),
	extensions: '.jpg', // Input file allowed extensions - Optional (Default to '.jpg, .jpeg, .png, .webp, .avif'),
}).on('change', (ev) => {
	console.log(ev.value);
});
```

### Video

```js
pane.addBinding(PARAMS, 'video', {
	label: 'Video',
	view: 'video',
	height: 110, // Preview block height in px - Optional (Default to 100)
	objectFit: 'contain', // Preview block object fit - Optional (Default to cover)
	showMonitor: true, // Whether or not to show the file name monitor - Optional (Default to false),
	extensions: '.mp4', // Input file allowed extensions - Optional (Default to '.mp4, .mov, .mpeg, .ogg, .webm, .mkv, .avi'),
}).on('change', (ev) => {
	console.log(ev.value);
});
```

### Three.js Texture

```js
const material = new THREE.MeshBasicMaterial();
const texture = new THREE.TextureLoader().load('https://threejs.org/examples/textures/uv_grid_opengl.jpg')
material.map = texture;

pane.addBinding(material, 'map', {
    label: 'Texture',
    view: 'texture',
    height: 100,
    showMonitor: true
  }).on('change', (ev) => { 
    console.log('change', ev);
});
```

## Todo

- Better styling
- Three.js texture
