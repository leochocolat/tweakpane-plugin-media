import {Pane} from '../node_modules/tweakpane/dist/tweakpane.min.js';
import * as TweakpaneMediaPlugin from '../dist/tweakpane-plugin-media.js';

const image = document.querySelector('img');
const video = document.querySelector('video');

const PARAMS = {
    image,
    video,
}

const pane = new Pane();

// Register plugin
pane.registerPlugin(TweakpaneMediaPlugin);

pane.addBinding(PARAMS, 'image', {
    label: 'Image',
    view: 'image',
    height: 100,
    objectFit: 'cover',
    showMonitor: true,
}).on('change', (ev) => {
    console.log({ new: ev.value });
    image.src = ev.value.src;
});

pane.addBinding(PARAMS, 'video', {
    label: 'Video',
    view: 'video',
    height: 100,
    objectFit: 'cover',
    showMonitor: true,
}).on('change', (ev) => {
    console.log({ new: ev.value });
    video.src = ev.value.src;
});