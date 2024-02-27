import { BaseInputParams, InputBindingPlugin } from '@tweakpane/core';
export interface PluginVideoInputParams extends BaseInputParams {
    extensions?: string;
    objectFit?: string;
    height?: number;
    showMonitor?: boolean;
    label: string;
    view: 'video';
}
export declare const PluginVideoInput: InputBindingPlugin<HTMLVideoElement, HTMLVideoElement, PluginVideoInputParams>;
