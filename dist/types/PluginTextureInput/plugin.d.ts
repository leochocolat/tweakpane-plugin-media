import { BaseInputParams, InputBindingPlugin } from '@tweakpane/core';
export interface PluginTextureInputParams extends BaseInputParams {
    extensions?: string;
    objectFit?: string;
    height?: number;
    showMonitor?: boolean;
    label: string;
    view: 'texture';
}
export declare const PluginTextureInput: InputBindingPlugin<any, any, PluginTextureInputParams>;
