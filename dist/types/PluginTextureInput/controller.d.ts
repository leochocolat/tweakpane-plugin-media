import { Controller, Value, ViewProps } from '@tweakpane/core';
import { PluginTextureInputParams } from './plugin.js';
import { PluginView } from './view.js';
interface Config {
    value: Value<any>;
    viewProps: ViewProps;
    params: PluginTextureInputParams;
}
export declare class PluginController implements Controller<PluginView> {
    readonly value: Value<any>;
    readonly view: PluginView;
    readonly viewProps: ViewProps;
    readonly params: PluginTextureInputParams;
    constructor(doc: Document, config: Config);
    private bindAll_;
    private setupEventListeners_;
    private removeEventListeners_;
    private inputHandler_;
}
export {};
