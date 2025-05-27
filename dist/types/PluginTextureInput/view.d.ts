import { Value, View, ViewProps } from '@tweakpane/core';
import { PluginTextureInputParams } from './plugin.js';
interface TextureValue {
    image?: HTMLElement | HTMLImageElement | HTMLCanvasElement;
    name?: string;
    id?: string;
    src?: string;
    needsUpdate?: boolean;
    isTexture?: boolean;
}
interface Config {
    value: Value<TextureValue>;
    viewProps: ViewProps;
    params: PluginTextureInputParams;
}
export declare class PluginView implements View {
    readonly element: HTMLElement;
    input: HTMLInputElement;
    texture: TextureValue;
    private value_;
    private extensions_;
    private head_;
    private container_;
    private monitor_;
    private label_;
    private image_;
    private params_;
    constructor(doc: Document, config: Config);
    private refresh_;
    private createElement_;
    private createContainer_;
    private createHead_;
    private createMonitor_;
    private createInput_;
    private createLabel_;
    private createImage_;
    private bindAll_;
    private setupTextureEvents_;
    private valueChangedHandler_;
    private setupEventListeners_;
    private watchTextureImage_;
    private removeEventListeners_;
    private dragenterHandler_;
    private dragleaveHandler_;
    private mouseenterHandler_;
    private mouseleaveHandler_;
}
export {};
