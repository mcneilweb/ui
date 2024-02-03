declare class PubSub {
    events: {
        [key: string]: Function[];
    };
    subscribe(event: string, callback: Function): void;
    publish(event: string, data: any): void;
}
export declare class ColorPicker extends HTMLElement {
    static observedAttributes: string[];
    static ps: PubSub;
    shadow: ShadowRoot;
    wrapper: HTMLDivElement;
    info: HTMLParagraphElement;
    picker_button: HTMLButtonElement;
    color_preview: HTMLDivElement;
    hue_slider: HTMLInputElement;
    sat_light_box: HTMLDivElement;
    color_pin: HTMLDivElement;
    hue: string;
    saturation: string;
    lightness: string;
    css: CSSStyleSheet;
    constructor();
    static define(tag?: string): void;
    getRandomHue(): void;
    connectedCallback(): void;
    getMousePosAsPercentageOfElementDimensions(e: MouseEvent, el: HTMLElement): {
        x: number;
        y: number;
    };
    disconnectedCallback(): void;
    adoptedCallback(): void;
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
}
export {};
