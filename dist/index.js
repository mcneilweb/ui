import { css, LitElement, html } from "lit";
class PubSub {
  constructor() {
    this.events = {};
  }
  subscribe(event, callback) {
    if (!this.events[event])
      this.events[event] = [];
    this.events[event].push(callback);
  }
  publish(event, data) {
    if (!this.events[event])
      return;
    this.events[event].forEach((callback) => callback(data));
  }
}
const _ColorPicker = class _ColorPicker extends HTMLElement {
  constructor() {
    super();
    this.hue = "0";
    this.saturation = "100%";
    this.lightness = "50%";
  }
  static define(tag = "color-picker") {
    customElements.define(tag, _ColorPicker);
  }
  getRandomHue() {
    this.setAttribute("hue", `${Math.floor(Math.random() * 360)}`);
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
    }`);
    this.shadow = this.attachShadow({ mode: "open" });
    this.wrapper = document.createElement("div");
    this.wrapper.setAttribute("class", "color-picker");
    this.info = document.createElement("p");
    this.info.textContent = "Open Source Color Picker Component";
    this.picker_button = document.createElement("button");
    this.picker_button.textContent = "Pick Color";
    this.picker_button.addEventListener("click", () => this.getRandomHue());
    this.color_preview = document.createElement("div");
    this.color_preview.setAttribute("class", "color-preview");
    this.color_preview.style.width = "100px";
    this.color_preview.style.height = "100px";
    this.hue_slider = document.createElement("input");
    this.hue_slider.setAttribute("type", "range");
    this.hue_slider.setAttribute("min", "0");
    this.hue_slider.setAttribute("max", "360");
    this.hue_slider.setAttribute("value", "0");
    this.hue_slider.setAttribute("class", "hue-slider");
    this.sat_light_box = document.createElement("div");
    this.sat_light_box.setAttribute("class", "sat_light_box");
    this.css.insertRule(`
.sat_light_box {
  background: linear-gradient(to top, black, transparent), linear-gradient(to right, white, hsl(var(--hue) var(--saturation) var(--lightness)));
}
    `);
    this.sat_light_box.style.width = "300px";
    this.sat_light_box.style.height = "300px";
    this.sat_light_box.style.position = "relative";
    this.color_pin = document.createElement("div");
    this.color_pin.setAttribute("class", "color-pin");
    this.color_pin.style.width = "10px";
    this.color_pin.style.height = "10px";
    this.color_pin.style.position = "absolute";
    this.color_pin.style.right = "0px";
    this.color_pin.style.top = "0px";
    this.color_pin.style.backgroundColor = "white";
    this.color_pin.style.border = "2px solid black";
    this.sat_light_box.appendChild(this.color_pin);
    this.wrapper.appendChild(this.info);
    this.wrapper.appendChild(this.picker_button);
    this.wrapper.appendChild(this.color_preview);
    this.wrapper.appendChild(this.sat_light_box);
    const pos_p = document.createElement("p");
    pos_p.textContent = "Position";
    this.wrapper.appendChild(pos_p);
    this.sat_light_box.addEventListener("mouseover", (e2) => {
      if (e2.target === this.sat_light_box) {
        const mouse = this.getMousePosAsPercentageOfElementDimensions(e2, this.sat_light_box);
        this.color_pin.style.left = `${mouse.x}`;
        this.color_pin.style.top = `${mouse.y}`;
      }
    });
    this.sat_light_box.addEventListener("mouseleave", (e2) => {
      if (e2.target === this.sat_light_box) {
        this.color_pin.style.display = "block";
      }
    });
    this.shadow.appendChild(this.wrapper);
    this.shadow.adoptedStyleSheets = [this.css];
    this.getRandomHue();
  }
  getMousePosAsPercentageOfElementDimensions(e2, el) {
    const rect = el.getBoundingClientRect();
    return {
      x: (e2.clientX - rect.left) / rect.width,
      y: (e2.clientY - rect.top) / rect.height
    };
  }
  disconnectedCallback() {
    console.log("Custom element removed from page.");
  }
  adoptedCallback() {
    console.log("Custom element moved to new page.");
  }
  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "hue":
        this.wrapper.style.setProperty("--hue", newValue);
        break;
    }
  }
};
_ColorPicker.observedAttributes = ["color", "hue", "saturation", "lightness"];
_ColorPicker.ps = new PubSub();
let ColorPicker = _ColorPicker;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1 = (t2) => (e2, o2) => {
  void 0 !== o2 ? o2.addInitializer(() => {
    customElements.define(t2, e2);
  }) : customElements.define(t2, e2);
};
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t = globalThis, e$1 = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, s = Symbol(), o$2 = /* @__PURE__ */ new WeakMap();
let n$2 = class n {
  constructor(t2, e2, o2) {
    if (this._$cssResult$ = true, o2 !== s)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t2, this.t = e2;
  }
  get styleSheet() {
    let t2 = this.o;
    const s2 = this.t;
    if (e$1 && void 0 === t2) {
      const e2 = void 0 !== s2 && 1 === s2.length;
      e2 && (t2 = o$2.get(s2)), void 0 === t2 && ((this.o = t2 = new CSSStyleSheet()).replaceSync(this.cssText), e2 && o$2.set(s2, t2));
    }
    return t2;
  }
  toString() {
    return this.cssText;
  }
};
const r$2 = (t2) => new n$2("string" == typeof t2 ? t2 : t2 + "", void 0, s), S = (s2, o2) => {
  if (e$1)
    s2.adoptedStyleSheets = o2.map((t2) => t2 instanceof CSSStyleSheet ? t2 : t2.styleSheet);
  else
    for (const e2 of o2) {
      const o3 = document.createElement("style"), n3 = t.litNonce;
      void 0 !== n3 && o3.setAttribute("nonce", n3), o3.textContent = e2.cssText, s2.appendChild(o3);
    }
}, c$1 = e$1 ? (t2) => t2 : (t2) => t2 instanceof CSSStyleSheet ? ((t3) => {
  let e2 = "";
  for (const s2 of t3.cssRules)
    e2 += s2.cssText;
  return r$2(e2);
})(t2) : t2;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: i, defineProperty: e, getOwnPropertyDescriptor: r$1, getOwnPropertyNames: h, getOwnPropertySymbols: o$1, getPrototypeOf: n$1 } = Object, a = globalThis, c = a.trustedTypes, l = c ? c.emptyScript : "", p = a.reactiveElementPolyfillSupport, d = (t2, s2) => t2, u = { toAttribute(t2, s2) {
  switch (s2) {
    case Boolean:
      t2 = t2 ? l : null;
      break;
    case Object:
    case Array:
      t2 = null == t2 ? t2 : JSON.stringify(t2);
  }
  return t2;
}, fromAttribute(t2, s2) {
  let i2 = t2;
  switch (s2) {
    case Boolean:
      i2 = null !== t2;
      break;
    case Number:
      i2 = null === t2 ? null : Number(t2);
      break;
    case Object:
    case Array:
      try {
        i2 = JSON.parse(t2);
      } catch (t3) {
        i2 = null;
      }
  }
  return i2;
} }, f = (t2, s2) => !i(t2, s2), y = { attribute: true, type: String, converter: u, reflect: false, hasChanged: f };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), a.litPropertyMetadata ?? (a.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class b extends HTMLElement {
  static addInitializer(t2) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t2);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t2, s2 = y) {
    if (s2.state && (s2.attribute = false), this._$Ei(), this.elementProperties.set(t2, s2), !s2.noAccessor) {
      const i2 = Symbol(), r2 = this.getPropertyDescriptor(t2, i2, s2);
      void 0 !== r2 && e(this.prototype, t2, r2);
    }
  }
  static getPropertyDescriptor(t2, s2, i2) {
    const { get: e2, set: h2 } = r$1(this.prototype, t2) ?? { get() {
      return this[s2];
    }, set(t3) {
      this[s2] = t3;
    } };
    return { get() {
      return e2 == null ? void 0 : e2.call(this);
    }, set(s3) {
      const r2 = e2 == null ? void 0 : e2.call(this);
      h2.call(this, s3), this.requestUpdate(t2, r2, i2);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t2) {
    return this.elementProperties.get(t2) ?? y;
  }
  static _$Ei() {
    if (this.hasOwnProperty(d("elementProperties")))
      return;
    const t2 = n$1(this);
    t2.finalize(), void 0 !== t2.l && (this.l = [...t2.l]), this.elementProperties = new Map(t2.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(d("finalized")))
      return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d("properties"))) {
      const t3 = this.properties, s2 = [...h(t3), ...o$1(t3)];
      for (const i2 of s2)
        this.createProperty(i2, t3[i2]);
    }
    const t2 = this[Symbol.metadata];
    if (null !== t2) {
      const s2 = litPropertyMetadata.get(t2);
      if (void 0 !== s2)
        for (const [t3, i2] of s2)
          this.elementProperties.set(t3, i2);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t3, s2] of this.elementProperties) {
      const i2 = this._$Eu(t3, s2);
      void 0 !== i2 && this._$Eh.set(i2, t3);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(s2) {
    const i2 = [];
    if (Array.isArray(s2)) {
      const e2 = new Set(s2.flat(1 / 0).reverse());
      for (const s3 of e2)
        i2.unshift(c$1(s3));
    } else
      void 0 !== s2 && i2.push(c$1(s2));
    return i2;
  }
  static _$Eu(t2, s2) {
    const i2 = s2.attribute;
    return false === i2 ? void 0 : "string" == typeof i2 ? i2 : "string" == typeof t2 ? t2.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var _a;
    this._$ES = new Promise((t2) => this.enableUpdating = t2), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (_a = this.constructor.l) == null ? void 0 : _a.forEach((t2) => t2(this));
  }
  addController(t2) {
    var _a;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t2), void 0 !== this.renderRoot && this.isConnected && ((_a = t2.hostConnected) == null ? void 0 : _a.call(t2));
  }
  removeController(t2) {
    var _a;
    (_a = this._$EO) == null ? void 0 : _a.delete(t2);
  }
  _$E_() {
    const t2 = /* @__PURE__ */ new Map(), s2 = this.constructor.elementProperties;
    for (const i2 of s2.keys())
      this.hasOwnProperty(i2) && (t2.set(i2, this[i2]), delete this[i2]);
    t2.size > 0 && (this._$Ep = t2);
  }
  createRenderRoot() {
    const t2 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return S(t2, this.constructor.elementStyles), t2;
  }
  connectedCallback() {
    var _a;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), (_a = this._$EO) == null ? void 0 : _a.forEach((t2) => {
      var _a2;
      return (_a2 = t2.hostConnected) == null ? void 0 : _a2.call(t2);
    });
  }
  enableUpdating(t2) {
  }
  disconnectedCallback() {
    var _a;
    (_a = this._$EO) == null ? void 0 : _a.forEach((t2) => {
      var _a2;
      return (_a2 = t2.hostDisconnected) == null ? void 0 : _a2.call(t2);
    });
  }
  attributeChangedCallback(t2, s2, i2) {
    this._$AK(t2, i2);
  }
  _$EC(t2, s2) {
    var _a;
    const i2 = this.constructor.elementProperties.get(t2), e2 = this.constructor._$Eu(t2, i2);
    if (void 0 !== e2 && true === i2.reflect) {
      const r2 = (void 0 !== ((_a = i2.converter) == null ? void 0 : _a.toAttribute) ? i2.converter : u).toAttribute(s2, i2.type);
      this._$Em = t2, null == r2 ? this.removeAttribute(e2) : this.setAttribute(e2, r2), this._$Em = null;
    }
  }
  _$AK(t2, s2) {
    var _a;
    const i2 = this.constructor, e2 = i2._$Eh.get(t2);
    if (void 0 !== e2 && this._$Em !== e2) {
      const t3 = i2.getPropertyOptions(e2), r2 = "function" == typeof t3.converter ? { fromAttribute: t3.converter } : void 0 !== ((_a = t3.converter) == null ? void 0 : _a.fromAttribute) ? t3.converter : u;
      this._$Em = e2, this[e2] = r2.fromAttribute(s2, t3.type), this._$Em = null;
    }
  }
  requestUpdate(t2, s2, i2) {
    if (void 0 !== t2) {
      if (i2 ?? (i2 = this.constructor.getPropertyOptions(t2)), !(i2.hasChanged ?? f)(this[t2], s2))
        return;
      this.P(t2, s2, i2);
    }
    false === this.isUpdatePending && (this._$ES = this._$ET());
  }
  P(t2, s2, i2) {
    this._$AL.has(t2) || this._$AL.set(t2, s2), true === i2.reflect && this._$Em !== t2 && (this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Set())).add(t2);
  }
  async _$ET() {
    this.isUpdatePending = true;
    try {
      await this._$ES;
    } catch (t3) {
      Promise.reject(t3);
    }
    const t2 = this.scheduleUpdate();
    return null != t2 && await t2, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var _a;
    if (!this.isUpdatePending)
      return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [t4, s3] of this._$Ep)
          this[t4] = s3;
        this._$Ep = void 0;
      }
      const t3 = this.constructor.elementProperties;
      if (t3.size > 0)
        for (const [s3, i2] of t3)
          true !== i2.wrapped || this._$AL.has(s3) || void 0 === this[s3] || this.P(s3, this[s3], i2);
    }
    let t2 = false;
    const s2 = this._$AL;
    try {
      t2 = this.shouldUpdate(s2), t2 ? (this.willUpdate(s2), (_a = this._$EO) == null ? void 0 : _a.forEach((t3) => {
        var _a2;
        return (_a2 = t3.hostUpdate) == null ? void 0 : _a2.call(t3);
      }), this.update(s2)) : this._$EU();
    } catch (s3) {
      throw t2 = false, this._$EU(), s3;
    }
    t2 && this._$AE(s2);
  }
  willUpdate(t2) {
  }
  _$AE(t2) {
    var _a;
    (_a = this._$EO) == null ? void 0 : _a.forEach((t3) => {
      var _a2;
      return (_a2 = t3.hostUpdated) == null ? void 0 : _a2.call(t3);
    }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t2)), this.updated(t2);
  }
  _$EU() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t2) {
    return true;
  }
  update(t2) {
    this._$Ej && (this._$Ej = this._$Ej.forEach((t3) => this._$EC(t3, this[t3]))), this._$EU();
  }
  updated(t2) {
  }
  firstUpdated(t2) {
  }
}
b.elementStyles = [], b.shadowRootOptions = { mode: "open" }, b[d("elementProperties")] = /* @__PURE__ */ new Map(), b[d("finalized")] = /* @__PURE__ */ new Map(), p == null ? void 0 : p({ ReactiveElement: b }), (a.reactiveElementVersions ?? (a.reactiveElementVersions = [])).push("2.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const o = { attribute: true, type: String, converter: u, reflect: false, hasChanged: f }, r = (t2 = o, e2, r2) => {
  const { kind: n3, metadata: i2 } = r2;
  let s2 = globalThis.litPropertyMetadata.get(i2);
  if (void 0 === s2 && globalThis.litPropertyMetadata.set(i2, s2 = /* @__PURE__ */ new Map()), s2.set(r2.name, t2), "accessor" === n3) {
    const { name: o2 } = r2;
    return { set(r3) {
      const n4 = e2.get.call(this);
      e2.set.call(this, r3), this.requestUpdate(o2, n4, t2);
    }, init(e3) {
      return void 0 !== e3 && this.P(o2, void 0, t2), e3;
    } };
  }
  if ("setter" === n3) {
    const { name: o2 } = r2;
    return function(r3) {
      const n4 = this[o2];
      e2.call(this, r3), this.requestUpdate(o2, n4, t2);
    };
  }
  throw Error("Unsupported decorator location: " + n3);
};
function n2(t2) {
  return (e2, o2) => "object" == typeof o2 ? r(t2, e2, o2) : ((t3, e3, o3) => {
    const r2 = e3.hasOwnProperty(o3);
    return e3.constructor.createProperty(o3, r2 ? { ...t3, wrapped: true } : t3), r2 ? Object.getOwnPropertyDescriptor(e3, o3) : void 0;
  })(t2, e2, o2);
}
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
let LitTest = class extends LitElement {
  constructor() {
    super(...arguments);
    this.name = "World";
  }
  render() {
    return html`<p>Hello, ${this.name}!</p>`;
  }
};
LitTest.styles = css`
    :host {
      color: blue;
    }
  `;
__decorateClass([
  n2({ type: String })
], LitTest.prototype, "name", 2);
LitTest = __decorateClass([
  t$1("lit-test")
], LitTest);
export {
  ColorPicker,
  LitTest
};
