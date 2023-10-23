import {
	BaseInputParams,
	BindingTarget,
	createPlugin,
	InputBindingPlugin,
	parseRecord,
} from '@tweakpane/core';

import {PluginController} from './controller.js';

export interface PluginImageInputParams extends BaseInputParams {
	extensions?: string;
	objectFit?: string;
	height?: number;
	showMonitor?: boolean;
	label: string;
	view: 'image';
}

// NOTE: You can see JSDoc comments of `InputBindingPlugin` for details about each property
//
// `InputBindingPlugin<In, Ex, P>` means...
// - The plugin receives the bound value as `Ex`,
// - converts `Ex` into `In` and holds it
// - P is the type of the parsed parameters
//
export const PluginImageInput: InputBindingPlugin<
	HTMLImageElement,
	HTMLImageElement,
	PluginImageInputParams
> = createPlugin({
	id: 'image-input',

	type: 'input',

	accept(exValue: unknown, params: Record<string, unknown>) {
		// Return null if underfined
		if (!exValue) return null;
		// Return null if not HTML Element
		if (!(exValue instanceof HTMLImageElement)) return null;

		// Parse parameters object
		const result = parseRecord<PluginImageInputParams>(params, (p) => ({
			// `view` option may be useful to provide a custom control for primitive values
			extensions: p.optional.string,
			objectFit: p.optional.string,
			height: p.optional.number,
			showMonitor: p.optional.boolean,
			label: p.required.string,
			view: p.required.constant('image'),
		}));

		if (!result) {
			return null;
		}

		// Return a typed value and params to accept the user input
		return {
			initialValue: exValue,
			params: result,
		};
	},

	binding: {
		reader(_args) {
			return (exValue: unknown): HTMLImageElement => {
				return exValue instanceof HTMLImageElement ? exValue : new Image();
			};
		},

		writer(_args) {
			return (target: BindingTarget, inValue) => {
				// Use `target.write()` to write the primitive value to the target,
				// or `target.writeProperty()` to write a property of the target
				target.write(inValue);
			};
		},
	},

	controller(args) {
		// Create a controller for the plugin
		return new PluginController(args.document, {
			value: args.value,
			viewProps: args.viewProps,
			params: args.params,
		});
	},
});
