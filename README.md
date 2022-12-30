# Tweakpane media plugin

Plugin for image and video inputs for [Tweakpane](tweakpane).

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
pane.addInput(PARAMS, 'image', {
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
pane.addInput(PARAMS, 'video', {
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

## Todo

- Better styling
- Three.js texture
