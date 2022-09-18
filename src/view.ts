import {ClassName, Value, View, ViewProps} from '@tweakpane/core';

import {PluginMediaInputParams} from './plugin';

interface Config {
	value: Value<HTMLImageElement>;
	viewProps: ViewProps;
	params: PluginMediaInputParams;
}

// Create a class name generator from the view name
// ClassName('tmp') will generate a CSS class name like `tp-tmpv`
const className = ClassName('tmp');

// Custom view class should implement `View` interface
export class PluginView implements View {
	public readonly element: HTMLElement;
	public input: HTMLInputElement;
	private value_: Value<HTMLImageElement>;
	private label_: HTMLElement;
	private image_: HTMLElement;
	private params_: PluginMediaInputParams;

	constructor(doc: Document, config: Config) {
		// Params
		this.params_ = config.params;

		// Create a root element for the plugin
		this.element = doc.createElement('div');
		this.element.classList.add(className());

		this.element.style.position = 'relative';
		if (this.params_.height)
			this.element.style.height = `${this.params_.height}px`;

		// Bind view props to the element
		config.viewProps.bindClassModifiers(this.element);

		// Receive the bound value from the controller
		this.value_ = config.value;

		// Extensions
		const extensions = this.params_.extensions || '.jpg, .jpeg, .png, .webp';

		// Input
		this.input = doc.createElement('input');
		this.input.setAttribute('id', 'media');
		this.input.setAttribute('type', 'file');
		this.input.setAttribute('accept', extensions);
		this.input.style.position = 'absolute';
		this.input.style.top = '0';
		this.input.style.left = '0';
		this.input.style.width = '100%';
		this.input.style.height = '100%';
		this.input.style.opacity = '0';
		this.input.style.padding = '0';
		this.input.style.cursor = 'pointer';
		this.input.addEventListener('input', this.onInput_.bind(this));
		this.element.appendChild(this.input);

		// Label
		this.label_ = doc.createElement('label');
		this.label_.setAttribute('for', 'media');
		this.label_.classList.add(className('text'));
		this.label_.innerHTML = '<span>Import media</span>';
		this.label_.style.opacity = '0';
		this.label_.style.display = 'flex';
		this.label_.style.justifyContent = 'center';
		this.label_.style.alignItems = 'center';
		this.label_.style.position = 'absolute';
		this.label_.style.left = '0';
		this.label_.style.top = '0';
		this.label_.style.bottom = '0';
		this.label_.style.right = '0';
		this.label_.style.margin = 'auto';
		this.label_.style.textAlign = 'center';
		this.label_.style.width = '100%';
		this.label_.style.pointerEvents = 'none';
		this.element.appendChild(this.label_);

		// Image
		this.image_ = new Image();
		this.image_.style.position = 'absolute';
		this.image_.style.pointerEvents = 'none';
		this.image_.style.left = '0';
		this.image_.style.top = '0';
		this.image_.style.width = '100%';
		this.image_.style.height = '100%';
		this.image_.style.objectFit = 'cover';
		this.image_.style.objectFit = this.params_.objectFit || 'cover';
		this.element.appendChild(this.image_);

		// Bind
		this.bindAll_();

		// Events
		this.setupEventListeners_();

		// Apply the initial value
		this.refresh_();

		// Dispose
		config.viewProps.handleDispose(() => {
			this.removeEventListeners_();
		});
	}

	private refresh_(): void {
		// Show Image in monitor
		this.image_.setAttribute('src', this.value_.rawValue.src);
	}

	private bindAll_() {
		this.valueChangedHandler_ = this.valueChangedHandler_.bind(this);
		this.dragenterHandler_ = this.dragenterHandler_.bind(this);
		this.dragleaveHandler_ = this.dragleaveHandler_.bind(this);
	}

	private setupEventListeners_() {
		this.value_.emitter.on('change', this.valueChangedHandler_);
		this.input.addEventListener('dragenter', this.dragenterHandler_);
		this.input.addEventListener('dragleave', this.dragleaveHandler_);
	}

	private removeEventListeners_() {
		this.value_.emitter.off('change', this.valueChangedHandler_.bind(this));
	}

	private valueChangedHandler_() {
		this.refresh_();
	}

	private dragenterHandler_() {}

	private dragleaveHandler_() {}

	private onInput_() {}
}
