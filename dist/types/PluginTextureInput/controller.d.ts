import { Controller, Value, ViewProps } from '@tweakpane/core';
import { PluginImageInputParams } from './plugin.js';
import { PluginView } from './view.js';
interface Config {
    value: Value<HTMLImageElement>;
    viewProps: ViewProps;
    params: PluginImageInputParams;
}
export declare class PluginController implements Controller<PluginView> {
    readonly value: Value<HTMLImageElement>;
    readonly view: PluginView;
    readonly viewProps: ViewProps;
    readonly params: PluginImageInputParams;
    constructor(doc: Document, config: Config);
    private bindAll_;
    private setupEventListeners_;
    private removeEventListeners_;
    private inputHandler_;
}
export {};
