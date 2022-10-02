import {ClassName, Value, View, ViewProps} from '@tweakpane/core';

import {PluginImageInputParams} from './index';

interface Config {
	value: Value<HTMLImageElement>;
	viewProps: ViewProps;
	params: PluginImageInputParams;
}

// Create a class name generator from the view name
// ClassName('tmp') will generate a CSS class name like `tp-tmpv`
const className = ClassName('tmp');

// Custom view class should implement `View` interface
export class PluginView implements View {
	public readonly element: HTMLElement;
	public input: HTMLInputElement;
	private value_: Value<HTMLImageElement>;
	private extensions_: string;
	private head_: HTMLElement;
	private container_: HTMLElement;
	private monitor_: HTMLElement;
	private label_: HTMLElement;
	private image_: HTMLElement;
	private params_: PluginImageInputParams;

	constructor(doc: Document, config: Config) {
		// Params
		this.params_ = config.params;

		// Receive the bound value from the controller
		this.value_ = config.value;

		// Extensions
		this.extensions_ = this.params_.extensions || '.jpg, .jpeg, .png, .webp';

		// Create a root element for the plugin
		this.element = this.createElement_(doc);

		// Bind view props to the element
		config.viewProps.bindClassModifiers(this.element);

		// Header
		this.head_ = this.createHead_(doc);
		this.element.appendChild(this.head_);

		this.monitor_ = this.createMonitor_(doc);
		this.head_.appendChild(this.monitor_);

		// Container
		this.container_ = this.createContainer_(doc);
		this.element.appendChild(this.container_);

		// Input
		this.input = this.createInput_(doc);
		this.container_.appendChild(this.input);

		// Label
		this.label_ = this.createLabel_(doc);
		this.container_.appendChild(this.label_);

		// Image
		this.image_ = this.createImage_();
		this.container_.appendChild(this.image_);

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

		// Reset opacity
		if (this.value_.rawValue.src) {
			this.image_.style.opacity = '1';
			this.label_.style.opacity = '0';
		} else {
			this.label_.style.opacity = '1';
		}

		// Apply image id
		this.monitor_.innerHTML = this.value_.rawValue.id;

		// Display monitor
		if (this.value_.rawValue.id && this.params_.showMonitor) {
			this.head_.style.display = 'flex';
		}
	}

	private createElement_(doc: Document): HTMLDivElement {
		const element = doc.createElement('div');
		element.classList.add(className());
		element.style.position = 'relative';
		if (this.params_.height) element.style.height = `${this.params_.height}px`;
		return element;
	}

	private createContainer_(doc: Document): HTMLElement {
		const container = doc.createElement('div');
		container.classList.add(className('container'));
		if (this.params_.height)
			container.style.height = `${this.params_.height}px`;
		return container;
	}

	private createHead_(doc: Document): HTMLElement {
		const head = doc.createElement('div');
		head.classList.add(className('head'));
		if (this.value_.rawValue.id && this.params_.showMonitor)
			head.style.display = 'flex';
		return head;
	}

	private createMonitor_(doc: Document): HTMLElement {
		const monitor = doc.createElement('div');
		monitor.classList.add(className('monitor'));
		monitor.innerHTML = this.value_.rawValue.id;
		return monitor;
	}

	private createInput_(doc: Document): HTMLInputElement {
		const input = doc.createElement('input');
		input.classList.add(className('input'));
		input.setAttribute('id', 'image');
		input.setAttribute('type', 'file');
		input.setAttribute('accept', this.extensions_);
		return input;
	}

	private createLabel_(doc: Document): HTMLElement {
		const label = doc.createElement('label');
		label.setAttribute('for', 'image');
		label.classList.add(className('label'));
		label.innerHTML = '<span>Import image</span>';
		return label;
	}

	private createImage_(): HTMLElement {
		const image = new Image();
		image.style.position = 'absolute';
		image.style.pointerEvents = 'none';
		image.style.left = '0';
		image.style.top = '0';
		image.style.width = '100%';
		image.style.height = '100%';
		image.style.objectFit = 'cover';
		image.style.objectFit = this.params_.objectFit || 'cover';
		return image;
	}

	private bindAll_() {
		this.valueChangedHandler_ = this.valueChangedHandler_.bind(this);
		this.dragenterHandler_ = this.dragenterHandler_.bind(this);
		this.dragleaveHandler_ = this.dragleaveHandler_.bind(this);
		this.mouseenterHandler_ = this.mouseenterHandler_.bind(this);
		this.mouseleaveHandler_ = this.mouseleaveHandler_.bind(this);
	}

	private setupEventListeners_() {
		this.value_.emitter.on('change', this.valueChangedHandler_);
		this.input.addEventListener('dragenter', this.dragenterHandler_);
		this.input.addEventListener('dragleave', this.dragleaveHandler_);
		this.input.addEventListener('mouseenter', this.mouseenterHandler_);
		this.input.addEventListener('mouseleave', this.mouseleaveHandler_);
	}

	private removeEventListeners_() {
		this.value_.emitter.off('change', this.valueChangedHandler_.bind(this));
		this.input.removeEventListener('dragenter', this.dragenterHandler_);
		this.input.removeEventListener('dragleave', this.dragleaveHandler_);
		this.input.removeEventListener('mouseenter', this.mouseenterHandler_);
		this.input.removeEventListener('mouseleave', this.mouseleaveHandler_);
	}

	private valueChangedHandler_() {
		this.refresh_();
	}

	private dragenterHandler_(event: DragEvent) {
		if (
			event.dataTransfer &&
			event.dataTransfer.items[0] &&
			event.dataTransfer.items[0].type.includes('image')
		) {
			this.image_.style.opacity = '0';
			this.label_.style.opacity = '1';
		}
	}

	private dragleaveHandler_() {
		if (this.value_.rawValue.src) {
			this.image_.style.opacity = '1';
			this.label_.style.opacity = '0';
		}
	}

	private mouseenterHandler_() {
		this.container_.style.opacity = '0.5';
	}

	private mouseleaveHandler_() {
		this.container_.style.opacity = '1';
	}
}
