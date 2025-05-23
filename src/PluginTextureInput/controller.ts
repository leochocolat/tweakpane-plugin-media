import {Controller, Value, ViewProps} from '@tweakpane/core';

import {PluginTextureInputParams} from './plugin.js';
import {PluginView} from './view.js';

interface Config {
	value: Value<any>; // Will be THREE.Texture at runtime
	viewProps: ViewProps;
	params: PluginTextureInputParams;
}

// Custom controller class should implement `Controller` interface
export class PluginController implements Controller<PluginView> {
	public readonly value: Value<any>; // Will be THREE.Texture at runtime
	public readonly view: PluginView;
	public readonly viewProps: ViewProps;
	public readonly params: PluginTextureInputParams;

	constructor(doc: Document, config: Config) {
		// Receive the bound value from the plugin
		this.value = config.value;
		this.params = config.params;

		// and also view props
		this.viewProps = config.viewProps;
		this.viewProps.handleDispose(() => {
			this.removeEventListeners_();
		});

		// Create a custom view
		this.view = new PluginView(doc, {
			value: this.value,
			viewProps: this.viewProps,
			params: this.params,
		});

		// Bind
		this.bindAll_();

		// Events
		this.setupEventListeners_();
	}

	private bindAll_(): void {
		this.inputHandler_ = this.inputHandler_.bind(this);
	}

	private setupEventListeners_(): void {
		this.view.input.addEventListener('input', this.inputHandler_);
	}

	private removeEventListeners_(): void {
		this.view.input.removeEventListener('input', this.inputHandler_);
	}

	private inputHandler_(): void {
		const file = this.view.input.files ? this.view.input.files[0] : null;
		if (!file) return;
	
		const image = new Image();
		const objectURL = URL.createObjectURL(file);
		image.src = objectURL;
		image.id = file.name;
		
		image.addEventListener('load', () => {
			// Get original texture dimensions
			const originalImage = this.view.texture.image;
			const targetWidth = (originalImage as HTMLImageElement | HTMLCanvasElement).width || 256;
			const targetHeight = (originalImage as HTMLImageElement | HTMLCanvasElement).height || 256;
			
			// Create canvas and resize
			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('2d')!;
			
			canvas.width = targetWidth;
			canvas.height = targetHeight;
			
			// Draw resized image
			ctx.drawImage(image, 0, 0, targetWidth, targetHeight);
			
			// Convert canvas back to image
			const resizedImage = new Image();
			resizedImage.src = canvas.toDataURL();
			resizedImage.id = file.name;
			
			resizedImage.addEventListener('load', () => {
				const texture = this.view.texture.clone();
				
				texture.image = resizedImage;
				texture.needsUpdate = true;
				this.value.rawValue = texture;

				// Clean up
				this.cleanupCanvas(canvas);
				URL.revokeObjectURL(objectURL);
			});
		});
	}

	private cleanupCanvas(canvas: HTMLCanvasElement): void {
		const ctx = canvas.getContext('2d');
		if (ctx) {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
		}
		canvas.width = 0;
		canvas.height = 0;
	}
	
}