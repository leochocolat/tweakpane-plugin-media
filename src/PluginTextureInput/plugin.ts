import {
	BaseInputParams,
	BindingTarget,
	createPlugin,
	InputBindingPlugin,
	parseRecord,
} from '@tweakpane/core';

import {PluginController} from './controller.js';

export interface PluginTextureInputParams extends BaseInputParams {
	extensions?: string;
	objectFit?: string;
	height?: number;
	showMonitor?: boolean;
	label: string;
	view: 'texture';
}

// `InputBindingPlugin<In, Ex, P>` means...
// - The plugin receives the bound value as `Ex`,
// - converts `Ex` into `In` and holds it
// - P is the type of the parsed parameters
//
export const PluginTextureInput: InputBindingPlugin<
	any,
	any,
	PluginTextureInputParams
> = createPlugin({
	id: 'texture-input',

	type: 'input',

	accept(exValue: unknown, params: Record<string, unknown>) {
		const result = parseRecord<PluginTextureInputParams>(params, (p) => ({
			extensions: p.optional.string,
			objectFit: p.optional.string,
			height: p.optional.number,
			showMonitor: p.optional.boolean,
			label: p.required.string,
			view: p.required.constant('texture'),
		}));

		if (!result) {
			return null;
		}
		
		if (exValue instanceof Object) {
			return {
				initialValue: exValue,
				params: result,
			};
		}
		
		try {
			const possibleTexture = exValue as any;
			
			const isTextureObject = possibleTexture && 
				(possibleTexture.isTexture === true || 
				 typeof possibleTexture.image !== 'undefined' ||
				 typeof possibleTexture.dispose === 'function');
			
			if (isTextureObject) {
				return {
					initialValue: possibleTexture,
					params: result,
				};
			}
		} catch (e) {
		}
		return null;
	},

	binding: {
		reader(_args) {
			return (exValue: unknown): any => {
				return exValue instanceof Object 
                    ? exValue 
                    : {};
			};
		},

		writer(_args) {
			return (target: BindingTarget, inValue) => {
				// Use `target.write()` to write the value to the target
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