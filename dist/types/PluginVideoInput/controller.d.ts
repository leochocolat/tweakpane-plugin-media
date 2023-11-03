import { Controller, Value, ViewProps } from '@tweakpane/core';
import { PluginVideoInputParams } from './plugin.js';
import { PluginView } from './view.js';
interface Config {
    value: Value<HTMLVideoElement>;
    viewProps: ViewProps;
    params: PluginVideoInputParams;
}
export declare class PluginController implements Controller<PluginView> {
    readonly value: Value<HTMLVideoElement>;
    readonly view: PluginView;
    readonly viewProps: ViewProps;
    readonly params: PluginVideoInputParams;
    constructor(doc: Document, config: Config);
    private bindAll_;
    private setupEventListeners_;
    private removeEventListeners_;
    private inputHandler_;
}
export {};
