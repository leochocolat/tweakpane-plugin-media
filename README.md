# Tweakpane media plugin

Plugin for image and video inputs for [Tweakpane](tweakpane).

# For plugin users

## Installation

```bash
npm install tweakpane
npm install github:leochocolat/tweakpane-plugin-media
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
	height: 80, // Optional (Default to 100)
	objectFit: 'contain', // Optional (Default to cover)
	showMonitor: true, // Optional (Default to false)
}).on('change', (ev) => {
	console.log(ev.value);
});
```

### Video

```js
pane.addInput(PARAMS, 'video', {
	label: 'Video',
	view: 'video',
	height: 110, // Optional (Default to 100)
	objectFit: 'contain', // Optional (Default to cover)
	showMonitor: true, // Optional (Default to false)
}).on('change', (ev) => {
	console.log(ev.value);
});
```

## Todo

- Better styling
- Three.js texture
