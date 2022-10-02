import {Controller, Value, ViewProps} from '@tweakpane/core';

import {PluginVideoInputParams} from './index';
import {PluginView} from './view';

interface Config {
	value: Value<HTMLVideoElement>;
	viewProps: ViewProps;
	params: PluginVideoInputParams;
}

// Custom controller class should implement `Controller` interface
export class PluginController implements Controller<PluginView> {
	public readonly value: Value<HTMLVideoElement>;
	public readonly view: PluginView;
	public readonly viewProps: ViewProps;
	public readonly params: PluginVideoInputParams;

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

		const video = document.createElement('video');
		video.src = URL.createObjectURL(file);
		video.id = file.name;

		const loadHandler = () => {
			video.removeEventListener('canplay', loadHandler);
			this.value.rawValue = video;
		};

		video.addEventListener('canplay', loadHandler);
	}
}
