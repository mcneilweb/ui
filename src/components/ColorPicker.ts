class PubSub {
  events: { [key: string]: Function[] } = {};

  subscribe(event: string, callback: Function) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(callback);
  }

  publish(event: string, data: any) {
    if (!this.events[event]) return;
    this.events[event].forEach(callback => callback(data));
  }
}

export class ColorPicker extends HTMLElement {
  static observedAttributes = ['color', 'hue', 'saturation', 'lightness'];
  static ps = new PubSub();

  shadow: ShadowRoot;
  wrapper: HTMLDivElement;
  info: HTMLParagraphElement;
  picker_button: HTMLButtonElement;
  color_preview: HTMLDivElement;
  hue_slider: HTMLInputElement;
  sat_light_box: HTMLDivElement;
  color_pin: HTMLDivElement;

  hue: string = "0";
  saturation: string = "100%";
  lightness: string = "50%";

  css: CSSStyleSheet;

  constructor() {
    super();
  }

  static define(tag: string = 'color-picker') {
    customElements.define(tag, ColorPicker);
  }
  
  getRandomHue() {
    this.setAttribute('hue', `${Math.floor(Math.random() * 360)}`);
  }

  connectedCallback() {
    
    this.css = new CSSStyleSheet();
    this.css.insertRule(`
.color-picker {
  --saturation: 100%;
  --lightness: 50%;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  gap: 1rem;
}
    `);

    this.css.insertRule(`
    .color-picker p {
      margin: 0;
    }`)
    this.shadow = this.attachShadow({ mode: 'open' });

    this.wrapper = document.createElement('div');
    this.wrapper.setAttribute('class', 'color-picker'); 

    this.info = document.createElement('p');
    this.info.textContent = 'Open Source Color Picker Component';

    this.picker_button = document.createElement('button');
    this.picker_button.textContent = 'Pick Color';
    this.picker_button.addEventListener('click', () => this.getRandomHue());

    this.color_preview = document.createElement('div');
    this.color_preview.setAttribute('class', 'color-preview');
    this.color_preview.style.width = '100px';
    this.color_preview.style.height = '100px';

    this.hue_slider = document.createElement('input');
    this.hue_slider.setAttribute('type', 'range');
    this.hue_slider.setAttribute('min', '0');
    this.hue_slider.setAttribute('max', '360');
    this.hue_slider.setAttribute('value', '0');
    this.hue_slider.setAttribute('class', 'hue-slider');

    this.sat_light_box = document.createElement('div');
    this.sat_light_box.setAttribute('class', 'sat_light_box');

    this.css.insertRule(`
.sat_light_box {
  background: linear-gradient(to top, black, transparent), linear-gradient(to right, white, hsl(var(--hue) var(--saturation) var(--lightness)));
}
    `)
    // this.sat_light_box.style.background = `linear-gradient(to top, black, transparent), linear-gradient(to right, white, hsl(${this.hue} ${this.saturation} ${this.lightness}))`;
    this.sat_light_box.style.width = '300px';
    this.sat_light_box.style.height = '300px';
    this.sat_light_box.style.position = 'relative';

    this.color_pin = document.createElement('div');
    this.color_pin.setAttribute('class', 'color-pin');
    this.color_pin.style.width = '10px';
    this.color_pin.style.height = '10px';
    this.color_pin.style.position = 'absolute';
    this.color_pin.style.right = '0px';
    this.color_pin.style.top = '0px';
    this.color_pin.style.backgroundColor = 'white';
    this.color_pin.style.border = '2px solid black';

    this.sat_light_box.appendChild(this.color_pin);

    this.wrapper.appendChild(this.info);
    this.wrapper.appendChild(this.picker_button);
    this.wrapper.appendChild(this.color_preview);
    this.wrapper.appendChild(this.sat_light_box);

    const pos_p = document.createElement('p');
    pos_p.textContent = 'Position';
    this.wrapper.appendChild(pos_p);

    this.sat_light_box.addEventListener('mouseover', (e) => {
      if (e.target === this.sat_light_box) {
        const mouse = this.getMousePosAsPercentageOfElementDimensions(e as MouseEvent, this.sat_light_box);
        this.color_pin.style.left = `${mouse.x}`;
        this.color_pin.style.top = `${mouse.y}`;
      }
    });

    this.sat_light_box.addEventListener('mouseleave', (e) => {
      if (e.target === this.sat_light_box) {
        this.color_pin.style.display = 'block';
      }
    });

    this.shadow.appendChild(this.wrapper);

    this.shadow.adoptedStyleSheets = [this.css];
    this.getRandomHue();
  }

  getMousePosAsPercentageOfElementDimensions(e: MouseEvent, el: HTMLElement) {
    const rect = el.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height
    };
  } 

  disconnectedCallback() {
    console.log('Custom element removed from page.');
  }

  adoptedCallback() {
    console.log('Custom element moved to new page.');
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    switch (name) {
      case 'hue':
        this.wrapper.style.setProperty('--hue', newValue);
        break;
    }
  }
}