import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('lit-test')
export class LitTest extends LitElement {
  static styles = css`
    :host {
      color: blue;
    }
  `;

  @property({ type: String })
  name?: string = 'World';

  render() {
    return html`<p>Hello, ${this.name}!</p>`;
  }
}
