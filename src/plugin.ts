import {
	BaseInputParams,
	BindingTarget,
	InputBindingPlugin,
	ParamsParsers,
	parseParams,
} from '@tweakpane/core';

import {PluginController} from './controller';

export interface PluginMediaInputParams extends BaseInputParams {
	extensions?: string;
	objectFit?: string;
	height?: number;
	label: string;
	view: 'media';
}

// NOTE: You can see JSDoc comments of `InputBindingPlugin` for details about each property
//
// `InputBindingPlugin<In, Ex, P>` means...
// - The plugin receives the bound value as `Ex`,
// - converts `Ex` into `In` and holds it
// - P is the type of the parsed parameters
//
export const MediaInputPlugin: InputBindingPlugin<
	HTMLImageElement,
	HTMLImageElement,
	PluginMediaInputParams
> = {
	id: 'media-input',

	type: 'input',

	css: '__css__',

	accept(exValue: unknown, params: Record<string, unknown>) {
		// Return null if underfined
		if (!exValue) return null;
		// Return null if not HTML Element
		if (!(exValue instanceof HTMLImageElement)) return null;

		// Parse parameters object
		const result = parseParams<PluginMediaInputParams>(params, {
			// `view` option may be useful to provide a custom control for primitive values
			extensions: ParamsParsers.optional.string,
			objectFit: ParamsParsers.optional.string,
			height: ParamsParsers.optional.number,
			label: ParamsParsers.required.string,
			view: ParamsParsers.required.constant('media'),
		});

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
};
