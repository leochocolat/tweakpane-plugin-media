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
			const TextureConstructor = this.view.texture.constructor as any;
			const newTexture = new TextureConstructor(image);
			
			const originalTexture = this.view.texture as any;
			const newTextureAny = newTexture as any;
			
			for (const key in originalTexture) {
				if (originalTexture.hasOwnProperty(key) && key !== 'image' && key !== 'source') {
					try {
						newTexture[key] = originalTexture[key];
					} catch (error) {
						console.warn(`Could not copy property: ${key}`, error);
					}
				}
			}
			
			newTextureAny.needsUpdate = true;
			this.value.rawValue = newTexture;
		});
	}
	
}