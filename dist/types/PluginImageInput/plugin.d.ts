import { BaseInputParams, InputBindingPlugin } from '@tweakpane/core';
export interface PluginImageInputParams extends BaseInputParams {
    extensions?: string;
    objectFit?: string;
    height?: number;
    showMonitor?: boolean;
    label: string;
    view: 'image';
}
export declare const PluginImageInput: InputBindingPlugin<HTMLImageElement, HTMLImageElement, PluginImageInputParams>;
