# Tweakpane media plugin

Plugin for image and video inputs for [Tweakpane][tweakpane].

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

```js
const params = {
	image: document.querySelector('img'),
};

pane
	.addInput(params, 'image', {
		view: 'media',
	})
	.on('change', (ev) => {
		console.log(ev.value);
	});
```

## Todo

- Video
- Better styling
- Monitor showing filename (make it an option)
- Canvas / FBO
- Three.js texture
