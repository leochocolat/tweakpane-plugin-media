import { Value, View, ViewProps } from '@tweakpane/core';
import { PluginVideoInputParams } from './plugin.js';
interface Config {
    value: Value<HTMLVideoElement>;
    viewProps: ViewProps;
    params: PluginVideoInputParams;
}
export declare class PluginView implements View {
    readonly element: HTMLElement;
    input: HTMLInputElement;
    private value_;
    private extensions_;
    private head_;
    private container_;
    private monitor_;
    private label_;
    private video_;
    private params_;
    constructor(doc: Document, config: Config);
    private refresh_;
    private createElement_;
    private createContainer_;
    private createHead_;
    private createMonitor_;
    private createInput_;
    private createLabel_;
    private createVideo_;
    private bindAll_;
    private setupEventListeners_;
    private removeEventListeners_;
    private valueChangedHandler_;
    private dragenterHandler_;
    private dragleaveHandler_;
    private mouseenterHandler_;
    private mouseleaveHandler_;
}
export {};
